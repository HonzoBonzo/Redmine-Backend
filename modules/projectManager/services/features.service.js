var neo4j = require('neo4j');
var Promise = require('bluebird');
var bodyParser = require('body-parser');

var graphDatabase = Promise.promisifyAll(neo4j).GraphDatabase;
var neodb = new graphDatabase('http://neo4j:koniu123@localhost:7474');

module.exports = {
  getFeature: getFeature,
  updateFeature: updateFeature,
  createFeature: createFeature,
  deleteFeature: deleteFeature,
  getAllFeatures: getAllFeatures,
  getProjectsExp: getProjectsExp,
  getAllFeaturesWithExpSorted: getAllFeaturesWithExpSorted,
  getUsersExp: getUsersExp,
  checkRelations: checkRelations
};

function getFeature(id){
	var query = [
		'MATCH (f:Feature),(f)-[]-(s:FeatureStatus), (f)-[]-(p:FeaturePriority), (f)-[]-(c:FeatureCategory), (f)-[]-(pr:Project), (f)-[]-(u:User)',
		'WHERE ID(f) = {id}',
		'return f,s,p,c,pr,u'
	];

	var params = {
		id: Number(id)
	};

	return neodb.cypherAsync({
		query : query.join('\n'),
		params: params
	});
}

function deleteFeature(id){
	console.log('usuwam feature!!!!!!!!!!!!');
	var query = [
		'MATCH (f:Feature) ',
		'WHERE ID(f)={id}',
		'OPTIONAL MATCH (f)-[fr]-()',
		'WITH f, fr',
		'OPTIONAL MATCH (f)<-[:IS_IN_FEATURE]-(t:Task)',
		'WITH f, fr, t',
		'OPTIONAL MATCH (t)-[tr]-()',
		'DELETE tr, t, fr, f '
	];

	var params = {
		id: Number(id)
	};

	return neodb.cypherAsync({
		query : query.join('\n'),
		params: params
	});
}

function getAllFeatures(){
	var query = [
    	'MATCH (f:Feature),(f)-[]-(s:FeatureStatus), (f)-[]-(p:FeaturePriority), (f)-[]-(c:FeatureCategory), (f)-[]-(pr:Project), (f)-[]-(u:User)',
		'return f,s,p,c,pr,u'
	];

	var params = {
	};

	return neodb.cypherAsync({
		query : query.join('\n'),
		params: params
	});
}

function getAllFeaturesWithExpSorted(from,limit,exp,sortableOption) {
	console.log('\nservice: getAllFeaturesWithExpSorted: '+ exp +'\n\n');
	console.log('serwis getAllFeaturesWithExpSorted:\n [from:'+from + ' /limit:'+ limit + ' /exp:' +  exp + ' /sortableOption:' +  sortableOption+']');
	
	var sortableOptionExp = 'ORDER BY';

	if (sortableOption === 'estimatedHours' || sortableOption === 'doneRatio') {
		sortableOptionExp += ' f.' + sortableOption; 
	} else {
		sortableOptionExp += ' lower(f.' + sortableOption + ')';
	}

	var query = [
    	'MATCH (f:Feature),(f)-[]-(s:FeatureStatus), (f)-[]-(p:FeaturePriority), (f)-[]-(c:FeatureCategory), (f)-[]-(pr:Project), (f)-[]-(u:User)',
    	'WHERE lower(f.subject) CONTAINS lower({exp})',
    	'MATCH (n:Feature)',
    	'WHERE lower(n.subject) CONTAINS lower({exp})',
		'RETURN f,s,p,c,pr,u,COUNT(n) as len',
		sortableOptionExp,
		'SKIP {from}',
		'LIMIT {limit}'
	];

	var params = {
		from: Number(from),
		limit: Number(limit),
		exp: exp,
		sortableOption: sortableOption
	};

	return neodb.cypherAsync({
		query : query.join('\n'),
		params: params
	});
}

function createFeature(projectId, subject, description, statusId, priorityId, authorId, categoryId, estimatedHours){
  	console.log('tworzy mi nowy feature\n\n');
  	console.log(projectId);
  	console.log(subject);
  	console.log(description);
  	console.log(statusId);
  	console.log(priorityId);
  	console.log(authorId);
  	console.log(categoryId);
  	console.log(estimatedHours);

  	var query = [
	   'CREATE (f:Feature {subject: {subject}, description: {description}, estimatedHours: {estimatedHours} })',
		'WITH f',
		'MATCH (s:FeatureStatus),(c:FeatureCategory),(p:FeaturePriority),(u:User),(pr:Project)',
		'WHERE ID(s)={statusId} AND ID(c)={categoryId} AND ID(p)={priorityId} AND ID(u)={authorId} AND ID(pr)={projectId}',
		'CREATE (f)-[:HAS_STATUS]->(s)',
		'CREATE (f)-[:HAS_CATEGORY]->(c)',
		'CREATE (f)-[:HAS_PRIORITY]->(p)',
		'CREATE (f)-[:HAS_AUTHOR]->(u)',
		'CREATE (f)-[:IS_IN_PROJECT]->(pr)'
  	];

	var params = {
	  	projectId: Number(projectId),
	  	subject: subject,
	  	description: description,
	  	statusId: Number(statusId),
	  	priorityId: Number(priorityId),
	  	authorId: Number(authorId),
	  	categoryId: Number(categoryId),
	  	estimatedHours: Number(estimatedHours)
	};

	return neodb.cypherAsync({
		query : query.join('\n'),
		params: params
	});
}

function updateFeature( id, projectId, subject, description, statusId, priorityId, authorId, categoryId, estimatedHours)
{
    var query = [
        'MATCH (s:FeatureStatus),(c:FeatureCategory),(p:FeaturePriority),(u:User),(pr:Project)',
		'WHERE ID(s)={statusId} AND ID(c)={categoryId} AND ID(p)={priorityId} AND ID(u)={authorId} AND ID(pr)={projectId}',
        'WITH s,c,p,u,pr',
        'MATCH (f:Feature)',
        'WHERE ID(f) = {id}',
        'OPTIONAL MATCH (f)-[r1]-(s2:FeatureStatus), (f)-[r2]-(c2:FeatureCategory), (f)-[r3]-(p2:FeaturePriority), (f)-[r4]-(u2:User), (f)-[r5]-(pr2:Project)',
        'DELETE r1,r2,r3,r4,r5',
        'WITH f,s,c,p,u,pr',
        'MERGE (f)-[:HAS_STATUS]->(s)',
        'MERGE (f)-[:HAS_CATEGORY]->(c)',
        'MERGE (f)-[:HAS_PRIORITY]->(p)',
        'MERGE (f)-[:HAS_AUTHOR]->(u)',
        'MERGE (f)-[:IS_IN_PROJECT]->(pr)',
        'SET f.subject = {subject}, f.description={description}, f.estimatedHours={estimatedHours}',
        'return f'
    ];

    var params = {
    	id: id,
    	projectId: Number(projectId),
	  	subject: subject,
	  	description: description,
	  	statusId: Number(statusId),
	  	priorityId: Number(priorityId),
	  	authorId: Number(authorId),
	  	categoryId: Number(categoryId),
	  	estimatedHours: Number(estimatedHours)
    };

    return neodb.cypherAsync({
    query : query.join('\n'),
    params: params
    });
}

function getProjectsExp(exp){
	//console.log('zapytanie exp: '+ exp);
	var query = [
	  	'MATCH (pr:Project)',
		'WHERE pr.name CONTAINS {exp}',
  		'MATCH (n:Project)',
		'WHERE n.name CONTAINS {exp}',
		'RETURN pr, COUNT(n) as len'
	];

	var params = {
		exp: exp
	};

	return neodb.cypherAsync({
		query : query.join('\n'),
		params: params
	});
}

function getUsersExp(exp){
	//console.log('zapytanie exp: '+ exp);
	var query = [
	  	'MATCH (u:User)',
		'WHERE u.firstName CONTAINS {exp}',
		'OR u.lastName CONTAINS {exp}',
		'RETURN u'
	];

	var params = {
		exp: exp
	};

	return neodb.cypherAsync({
		query : query.join('\n'),
		params: params
	});
}


function checkRelations(id){
	var query = [
		'MATCH (f:Feature)-[rels]-(t:Task)',
		'WHERE ID(f)={id}',
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