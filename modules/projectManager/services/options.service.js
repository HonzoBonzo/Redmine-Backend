var neo4j = require('neo4j');
var Promise = require('bluebird');
var bodyParser = require('body-parser');

var graphDatabase = Promise.promisifyAll(neo4j).GraphDatabase;
var neodb = new graphDatabase('http://neo4j:koniu123@localhost:7474');

module.exports = {
  updateOption: updateOption,
  deleteOption: deleteOption,
  createOption: createOption,
  checkRelations: checkRelations
};



function deleteOption(id){
	console.log('deleteOption');
	var query = [
		'MATCH (o)',
	 	'WHERE ID(o) = {id}',
	 	//'OPTIONAL MATCH (s)-[r]-()', //' //drops p's relations
	 	'DELETE o'//,r'
	];

	var params = {
		id: Number(id)
	};

	return neodb.cypherAsync({
		query : query.join('\n'),
		params: params
	});
}

function updateOption(id, name)
{
    var query =[
		'MATCH (o)',
	  	'WHERE ID(o) = {id}',
	  	'WITH o',
	  	'SET o.name = {name}'
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

function createOption(label, name){
	console.log('\n\nserwis: createOption  '+ label+'  '+ name+'\n');
 	var query = [
   		'CREATE (nowy :' + label, 
   		'{ name : {name} })',
   		'return nowy'
  	];

  	var params = {
  		label: label,
  		name: name
  	};

 	return neodb.cypherAsync({
 	query : query.join('\n'),
 	params: params
  	});
}


function checkRelations(id){
  var query = [
    'MATCH (o)-[rels]-()',
    'WHERE ID(o)={id}',
    'return count(rels) as amount'
  ];

  var params = {
    id: Number(id)
  };

  return neodb.cypherAsync({
    query : query.join('\n'),
    params: params
  });
}