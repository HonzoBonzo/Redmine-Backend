var neo4j = require('neo4j');
var Promise = require('bluebird');
var bodyParser = require('body-parser');

var graphDatabase = Promise.promisifyAll(neo4j).GraphDatabase;
var neodb = new graphDatabase('http://neo4j:koniu123@localhost:7474');

module.exports = {
  getTracker: getTracker,
  updateTracker: updateTracker,
  createTracker: createTracker,
  deleteTracker: deleteTracker,
  getAllTrackers: getAllTrackers
};

function getTracker(id){
	var query = [
		'MATCH (tr:TaskTracker)',
	 	'WHERE ID(tr) = {id}',
	 	'RETURN tr'
	];

	var params = {
		id: Number(id)
	};

	return neodb.cypherAsync({
		query : query.join('\n'),
		params: params
	});
}

function deleteTracker(id){
	var query = [
		'MATCH (tr:TaskTracker)',
	 	'WHERE ID(tr) = {id}',
	 	'OPTIONAL MATCH (tr)-[r]-()', //' //drops p's relations
	 	'DELETE r,tr'
	];

	var params = {
		id: Number(id)
	};

	return neodb.cypherAsync({
		query : query.join('\n'),
		params: params
	});
}

function getAllTrackers(){
	console.log('wywolanie getAllTrackers');
	var query = [
    	'MATCH (tr:TaskTracker)',
	  	'RETURN tr'
	];

	var params = {
	};

	return neodb.cypherAsync({
		query : query.join('\n'),
		params: params
	});
}

function createTracker(name){

 var query = [
   	'CREATE (nowy:TaskTracker { name : {name} }) return nowy'
  ];

  var params = {
  	name: name
  };

 return neodb.cypherAsync({
 query : query.join('\n'),
 params: params
  });
}

function updateTracker(id, name)
{
    var query =[
	    'MATCH (tr:TaskTracker)',
	  	'WHERE ID(tr) = {id}',
	  	'WITH tr',
	  	'SET tr.name = {name}'
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
