var neo4j = require('neo4j');
var Promise = require('bluebird');
var bodyParser = require('body-parser');

var graphDatabase = Promise.promisifyAll(neo4j).GraphDatabase;
var neodb = new graphDatabase('http://neo4j:koniu123@localhost:7474');

module.exports = {
  getPriority: getPriority,
  updatePriority: updatePriority,
  createPriority: createPriority,
  deletePriority: deletePriority,
  getAllPriorities: getAllPriorities
};

function getPriority(id){
	var query = [
		'MATCH (p:TaskPriority)',
	 	'WHERE ID(p) = {id}',
	 	'RETURN p'
	];

	var params = {
		id: Number(id)
	};

	return neodb.cypherAsync({
		query : query.join('\n'),
		params: params
	});
}

function deletePriority(id){
	var query = [
		'MATCH (p:TaskPriority)',
	 	'WHERE ID(p) = {id}',
	 	'OPTIONAL MATCH (p)-[r]-()', //' //drops p's relations
	 	'DELETE r,p'
	];

	var params = {
		id: Number(id)
	};

	return neodb.cypherAsync({
		query : query.join('\n'),
		params: params
	});
}

function getAllPriorities(){
	console.log('wywolanie getAllPriorities');
	var query = [
    	'MATCH (p:TaskPriority)',
	  	'RETURN p'
	];

	var params = {
	};

	return neodb.cypherAsync({
		query : query.join('\n'),
		params: params
	});
}

function createPriority(name){

 var query = [
   	'CREATE (nowy:TaskPriority { name : {name} }) return nowy'
  ];

  var params = {
  	name: name
  };

 return neodb.cypherAsync({
 query : query.join('\n'),
 params: params
  });
}

function updatePriority(id, name)
{
    var query =[
	    'MATCH (p:TaskPriority)',
	  	'WHERE ID(p) = {id}',
	  	'WITH p',
	  	'SET p.name = {name}'
    ];

    var params = {
    	id: Number(id),
    	name: name
    };

    return neodb.cypherAsync({
    query : query.join('\n'),
    params: params
    });
}
