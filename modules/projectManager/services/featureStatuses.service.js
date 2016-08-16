var neo4j = require('neo4j');
var Promise = require('bluebird');
var bodyParser = require('body-parser');

var graphDatabase = Promise.promisifyAll(neo4j).GraphDatabase;
var neodb = new graphDatabase('http://neo4j:koniu123@localhost:7474');

module.exports = {
  getStatus: getStatus,
  updateStatus: updateStatus,
  createStatus: createStatus,
  deleteStatus: deleteStatus,
  getAllStatuses: getAllStatuses
};

function getStatus(id){
	console.log('getStatus');
	var query = [
		'MATCH (s:FeatureStatus)',
	 	'WHERE ID(s) = {id}',
	 	'RETURN s'
	];

	var params = {
		id: Number(id)
	};

	return neodb.cypherAsync({
		query : query.join('\n'),
		params: params
	});
}

function getAllStatuses(){
	console.log('getAllStatuses\n');
	var query = [
    	'MATCH (s:FeatureStatus)',
	  	'RETURN s'
	];

	var params = {
	};

	return neodb.cypherAsync({
		query : query.join('\n'),
		params: params
	});
}

function createStatus(name){
	console.log('createStatus');
 	var query = [
   		'CREATE (nowy:FeatureStatus { name : {name} }) return nowy'
  	];

  	var params = {
  		name: name
  	};
 	return neodb.cypherAsync({
 	query : query.join('\n'),
 	params: params
  	});
}


function deleteStatus(id){
	console.log('deleteStatus');
	var query = [
		'MATCH (s:FeatureStatus)',
	 	'WHERE ID(s) = {id}',
	 	'OPTIONAL MATCH (s)-[r]-()', //' //drops p's relations
	 	'DELETE r,s'
	];

	var params = {
		id: Number(id)
	};

	return neodb.cypherAsync({
		query : query.join('\n'),
		params: params
	});
}

function updateStatus(id, name)
{
    var query =[
		'MATCH (s:FeatureStatus)',
	  	'WHERE ID(s) = {id}',
	  	'WITH s',
	  	'SET s.name = {name}'
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
