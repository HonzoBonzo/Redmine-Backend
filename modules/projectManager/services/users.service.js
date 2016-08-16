var neo4j = require('neo4j');
var Promise = require('bluebird');
var bodyParser = require('body-parser');
var _ = require('lodash');

var graphDatabase = Promise.promisifyAll(neo4j).GraphDatabase;
var neodb = new graphDatabase('http://neo4j:koniu123@localhost:7474');

module.exports = {
  getUserById: getUserById,
  updateUser: updateUser,
  createUser: createUser,
  deleteUser: deleteUser,
  getAllUsers: getAllUsers,
  getUserBy: getUserBy,
  checkLoginFree: checkLoginFree,
  getAllUsersWithExpSorted: getAllUsersWithExpSorted
};

function getUserById(id){
	console.log('service: getUserById');
	var query = [
		'MATCH (u:User)',
	 	'WHERE ID(u) = {id}',
	 	'RETURN u'
	];

	var params = {
		id: Number(id)
	};

	return neodb.cypherAsync({
		query : query.join('\n'),
		params: params
	}).then(function(result) {
		if(result && result[0]) {

			var user = {
				id: result[0].u._id,
				login: result[0].u.properties.login,
				firstName: result[0].u.properties.firstName,
				lastName: result[0].u.properties.lastName
			};
			return user;
		} else {
			return null;
		}
	}).catch(function(err) {
		res.send(err);
	}); 
}


function getUserBy(propertyName, propertyValue){
	console.log('service: getUserBy');
	var query = [
		'MATCH (u:User)',
	 	'WHERE u.'+ propertyName +' = {propertyValue}',
	 	'RETURN u'
	];

	var params = {
		propertyValue: propertyValue
	};

	// return neodb.cypherAsync({
	// 	query : query.join('\n'),
	// 	params: params
	// }).then(function(result) {
	// 	if( result && result[0] ) {
	// 		console.log('znalazlem usera!');
	// 		//console.log(result);
	// 		user = _.clone(result[0].u.properties);
	// 		user.id = result[0].u._id;
	// 		console.log(user);

	// 		return user;
	// 	} else {
	// 		console.log('brak takiego usera!');
	// 		return null;
	// 	}
	// }).catch(function(err) {
	// 	res.send(err);
	// }); 
    return neodb.cypherAsync({
        query: query.join('\n'),
        params: params
    }).then(function(result){
      if(result && result[0]){
        var user = _.clone(result[0].u.properties);
        user.id = result[0].u._id;
    	console.log('dupa');
        console.log(user);
    	console.log('dupa');
        return user;
      }
      return null;
    }).catch(function(err){
      res.send(err);
    });
}

function checkLoginFree(login){
	console.log('service: checkLoginFree');
	var query = [
		'MATCH (u:User)',
	 	'WHERE u.login = {login}',
	 	'RETURN u'
	];

	var params = {
		login: login
	};

	return neodb.cypherAsync({
		query : query.join('\n'),
		params: params
	}).then(function(result) {
		if( result && result[0] ) {
			console.log('podany login juz istnieje!');
			return {free: false};
		} else {
			console.log('user o podanym loginie nie istnieje w bazie!');
			return {free: true};
		}
	}); 
}


function deleteUser(id){
	var query = [
		'MATCH (u:User)',
	 	'WHERE ID(u) = {id}',
	 	'OPTIONAL MATCH (u)-[r]-()', //' //drops p's relations
	 	'DELETE r,u'
	];

	var params = {
		id: Number(id)
	};

	return neodb.cypherAsync({
		query : query.join('\n'),
		params: params
	});
}

function getAllUsers(){
	console.log('service: getAllUsersUsers');
	var query = [
    	'MATCH (u:User)',
		'RETURN u'
	];

	var params = {
	};

	return neodb.cypherAsync({
		query : query.join('\n'),
		params: params
	});
}

function getAllUsersWithExpSorted(from, limit, exp, sortableOption){
	console.log('service: getAllUsersWithExpSorted');
	console.log('from: ' +  from, 'limit: ' +  limit,'to: ' + (from+limit) );

	var query = [
    	'MATCH (u:User)',
    	'WHERE lower(u.firstName) CONTAINS lower({exp}) OR lower(u.lastName) CONTAINS lower({exp}) OR lower(u.login) CONTAINS lower({exp})',
    	'WITH u',
    	'MATCH (un:User)',
    	'WHERE lower(un.firstName) CONTAINS lower({exp}) OR lower(un.lastName) CONTAINS lower({exp}) OR lower(un.login) CONTAINS lower({exp})',
    	'WITH u,un',
		'RETURN u, COUNT(un) as len',
		'ORDER BY u.'+sortableOption,
		'SKIP {from}',
		'LIMIT {limit}'
	];

	var params = {
		from: from,
		limit: limit,
		exp: exp,
		sortableOption : sortableOption
	};

	return neodb.cypherAsync({
		query : query.join('\n'),
		params: params
	}).then(function(result) {
		// console.log('result');
		// console.log(result);
		// console.log('result[10].u');
		// console.log(result[10].u);

		if(result && result [0]) {
			var users = [];
			var len = result[0].len;
			console.log('ilosc userow: ' + len);
			// console.log('result cypher:');
			// console.log(result);
			console.log('for idzie od: 0 do ' + limit);

			for (var i = 0; i < limit; i++) {
				console.log('for result['+i+']: ', result[i].u.properties, result[i].u._id);
				users[i] = _.clone(result[i].u.properties);
				users[i].id = result[i].u._id;
			}
			// var i =0;
			// for (var user in result) {
			// 	console.log('foreach user: ', user);
			// 	users[i] = _.clone(user.u.properties);
			// 	users[i].id = user.u._id;
			// 	i ++;
			// }

			return {
				users: users,
				len: result[0].u.len
			};
		} else {
			return null;
		}
	});
}



function createUser(login, password, firstName, lastName){

 var query = [
  	'CREATE (nowy:User { login : {login} , password:{password}, firstName:{firstName}, lastName:{lastName}}) return nowy'
  ];

  var params = {
  	login: login,
  	password: password,
  	firstName: firstName,
  	lastName: lastName
  };

	return neodb.cypherAsync({
		query : query.join('\n'),
		params: params
	}).then(function(result) {
		if (result) {
			// var user = {};
			console.log('Poprawne utworzenie uzytkownika');
			//console.log(result);
			var user = _.clone(result[0].nowy.properties);
			user.id = result[0].nowy._id;
			console.log(user);
			return {user : user, success: true};
		} else {
			return {user : null, success: false};
		}
	});
}

function updateUser(id, password, firstName, lastName)
{
	// NIE MOZNA ZMIENIC LOGINU !!!
    var query =[
	   	'MATCH (u:User)',
	  	'WHERE ID(u) = {id}',
	  	'WITH u',
	  	'SET u.password = {password}, u.firstName = {firstName}, m.lastName={lastName}'
    ];

    var params = {
    	id: id,
	  	password: password,
	  	firstName: firstName,
	  	lastName: lastName
    };

    return neodb.cypherAsync({
    query : query.join('\n'),
    params: params
    });
}
