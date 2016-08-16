var neo4j = require('neo4j');
var Promise = require('bluebird');
var bodyParser = require('body-parser');

var graphDatabase = Promise.promisifyAll(neo4j).GraphDatabase;
var neodb = new graphDatabase('http://neo4j:koniu123@localhost:7474');

module.exports = {
  getCategory: getCategory,
  updateCategory: updateCategory,
  createCategory: createCategory,
  deleteCategory: deleteCategory,
  getAllCategories: getAllCategories
};

function getCategory(id){
	var query = [
		'MATCH (c:TaskCategory)',
	 	'WHERE ID(c) = {id}',
	 	'RETURN c'
	];

	var params = {
		id: Number(id)
	};

	return neodb.cypherAsync({
		query : query.join('\n'),
		params: params
	});
}

function deleteCategory(id){
	var query = [
		'MATCH (c:TaskCategory)',
	 	'WHERE ID(c) = {id}',
	 	'OPTIONAL MATCH (c)-[r]-()', //' //dropc p'c relationc
	 	'DELETE r,c'
	];

	var params = {
		id: Number(id)
	};

	return neodb.cypherAsync({
		query : query.join('\n'),
		params: params
	});
}

function getAllCategories(){
	var query = [
    	'MATCH (c:TaskCategory)',
	  	'RETURN c'
	];

	var params = {
	};

	return neodb.cypherAsync({
		query : query.join('\n'),
		params: params
	});
}

function createCategory(name){

 var query = [
  	'CREATE (nowy:TaskCategory { name : {name} }) return nowy'
  ];

  var params = {
  	name: name
  };

 return neodb.cypherAsync({
 query : query.join('\n'),
 params: params
  });
}

function updateCategory(id, name){
    var query =[
	   	'MATCH (c:TaskCategory)',
	  	'WHERE ID(c) = {id}',
	  	'WITH c',
	  	'SET c.name = {name}'
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
