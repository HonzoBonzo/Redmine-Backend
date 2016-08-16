var neo4j = require('neo4j');
var Promise = require('bluebird');
var bodyParser = require('body-parser');

var graphDatabase = Promise.promisifyAll(neo4j).GraphDatabase;
var neodb = new graphDatabase('http://neo4j:koniu123@localhost:7474');

module.exports = {
  getProject: getProject,
  updateProject: updateProject,
  createProject: createProject,
  deleteProject: deleteProject,
  getAllProjects: getAllProjects,
  //getRecordsAmount: getRecordsAmount,
  getAllProjectsWithExpSorted: getAllProjectsWithExpSorted,
  //getChangeList: getChangeList,
  checkRelations: checkRelations
};

function getProject(id){
	var query = [
	 'MATCH (m:Project)',
	 'WHERE ID(m) = {id}',
	 'RETURN m'
	];

	var params = {
	 id: Number(id)
	};

	return neodb.cypherAsync({
	  query : query.join('\n'),
	  params: params
	});
}

function deleteProject(id){
	var query = [
		'MATCH (p: Project) ',
		'WHERE ID(p)={id}',
		'OPTIONAL MATCH (p)-[pr]-()',
		'WITH p, pr',
		'OPTIONAL MATCH (p)<-[:IS_IN_PROJECT]-(f: Feature)',
		'WITH p, pr, f',
		'OPTIONAL MATCH (f)-[fr]-()',
		'WITH p, pr, f, fr',
		'OPTIONAL MATCH (f)<-[:IS_IN_FEATURE]-(t: Task)',
		'WITH p, pr, f, fr, t',
		'OPTIONAL MATCH (t)-[tr]-()',
		'DELETE tr, t, fr, f, pr, p'
	];

	var params = {
	  id: Number(id)
	};

	return neodb.cypherAsync({
	  query : query.join('\n'),
	  params: params
	});
}

function getAllProjects(){
	var query = [
	  	'MATCH (m:Project)',
		'RETURN m',
		'ORDER BY m.name'
	];

	var params = {
	};

	return neodb.cypherAsync({
		query : query.join('\n'),
		params: params
	});
}

function createProject(namep,descriptionp,identifierp){

	console.log("\ncreate sie robi\n");
	
	var query = [
  		'CREATE (nowy:Project { name : {name} , description:{description}, identifier:{identifier}}) return nowy'
 	];

 	var params = {
	 	"name": namep,
	 	"description": descriptionp,
	 	"identifier": identifierp
 	};

	return neodb.cypherAsync({
		query : query.join('\n'),
		params: params
 	});
}

function updateProject(idp,namep,descriptionp,identifierp)
{
	console.log("update sie robi\n");
	
	var query = [
	  	'MATCH (m:Project)',
	  	'WHERE ID(m) = {id}',
	  	'WITH m',
	  	'SET m.name = {name}, m.description = {description}, m.identifier={identifier}'
 	];

 	var params = {
	 	id: Number(idp),
	 	name: namep,
	 	description: descriptionp,
	 	identifier: identifierp
 	};

	return neodb.cypherAsync({
		query : query.join('\n'),
		params: params
 	});
}


// function getRecordsAmount(){
// 	console.log('licze');
// 	var query = [
// 	  'MATCH (:Project) RETURN count(*) AS m'
// 	];

// 	var params = {
// 	};

// 	return neodb.cypherAsync({
// 		query : query.join('\n'),
// 		params: params
// 	});
// }

function getAllProjectsWithExpSorted(from, limit, exp, sortableOption){
	console.log('\nservice: getAllTasksWithExpSorted: '+ exp +'\n');
	console.log('serwis getAllTasksWithExpSorted:\n [from:'+from + ' /limit:'+ limit + ' /exp:' +  exp + ' /sortableOption:' +  sortableOption+']');
	var sortableOptionExp = 'ORDER BY';

	if (sortableOption === 'estimatedHours' || sortableOption === 'doneRatio') {
		sortableOptionExp += ' m.' + sortableOption; 
	} else {
		sortableOptionExp += ' lower(m.' + sortableOption + ')';
	}

	var query = [
		'MATCH (m:Project)',
		'WHERE lower(m.name) CONTAINS lower({exp})',
  		'OR lower(m.description) CONTAINS lower({exp})',
  		'OR lower(m.identifier) CONTAINS lower({exp})',
  		'MATCH (n:Project)',
		'WHERE lower(n.name) CONTAINS lower({exp})',
  		'OR lower(n.description) CONTAINS lower({exp})',
  		'OR lower(n.identifier) CONTAINS lower({exp})',
		'RETURN m, COUNT(n) as len',
		sortableOptionExp,
		'SKIP {from}',
		'LIMIT {limit}'
	];

	var params = {
		from: Number(from),
		limit: Number(limit),
		exp: exp
	};

	return neodb.cypherAsync({
		query : query.join('\n'),
		params: params
	});
}

// function getChangeList(exp){
//  var query = [
//   'MATCH (m:Project)',
//   'WHERE m.name CONTAINS {exp}',
//   'OR m.description CONTAINS {exp}',
//   'OR m.identifier CONTAINS {exp}',
//   'RETURN m'
//  ];

//  var params = {
//   exp: exp
//  };

//  return neodb.cypherAsync({
//   query : query.join('\n'),
//   params: params
//  });
// }


function checkRelations(id){
	var query = [
		'MATCH (p:Project)-[rels]-(f:Feature)',
		'WHERE ID(p)={id}',
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