var neo4j = require('neo4j');
var Promise = require('bluebird');
var bodyParser = require('body-parser');

var graphDatabase = Promise.promisifyAll(neo4j).GraphDatabase;
var neodb = new graphDatabase('http://neo4j:koniu123@localhost:7474');

module.exports = {
  getTask: getTask,
  updateTask: updateTask,
  createTask: createTask,
  deleteTask: deleteTask,
  getAllTasks: getAllTasks,
  getFeaturesExp: getFeaturesExp,
  //getAllTasksWithExp: getAllTasksWithExp,
  getUsersExp: getUsersExp,
  getAllTasksWithExpSorted: getAllTasksWithExpSorted,
  getAllTasksWithExpSortedFiltered: getAllTasksWithExpSortedFiltered
};

function getTask(id){
	var query = [
    	'MATCH (t:Task),(t)-[]-(s:TaskStatus), (t)-[]-(p:TaskPriority), (t)-[]-(c:TaskCategory), (t)-[]-(f:Feature), (t)-[]-(u:User), (t)-[]-(tr:TaskTracker)',
		'WHERE ID(t) = {id}',
		'return t,s,p,c,f,u,tr'
	];

	var params = {
		id: Number(id)
	};

	return neodb.cypherAsync({
		query : query.join('\n'),
		params: params
	});
}

function deleteTask(id){
	console.log('usuwam task!!!!!!!!!!!!');
	console.log('serwis: deleteTask: id: '+ id +'\n!\n');
	var query = [
		'MATCH (t:Task)',
	 	'WHERE ID(t) = {id}',
	 	'OPTIONAL MATCH (t)-[r]-()', //' //drops p's relations
	 	'DELETE r,t'
	];

	var params = {
		id: Number(id)
	};

	return neodb.cypherAsync({
		query : query.join('\n'),
		params: params
	});
}

function getAllTasks(){
	var query = [
    	'MATCH (t:Task),(t)-[]-(s:TaskStatus), (t)-[]-(p:TaskPriority), (t)-[]-(c:TaskCategory), (t)-[]-(f:Feature), (t)-[]-(u:User), (t)-[]-(tr:TaskTracker)',
		'return t,s,p,c,f,u,tr',
		'ORDER BY lower(t.subject)',
	];

	var params = {
	};

	return neodb.cypherAsync({
		query : query.join('\n'),
		params: params
	});
}

// function getAllTasksWithExp(from,limit,exp) {
// 	console.log('\nservice: getAllTasksWithExp: '+ exp +'\n\n');

// 	var query = [
//     	'MATCH (t:Task),(t)-[]-(s:TaskStatus), (t)-[]-(p:TaskPriority), (t)-[]-(c:TaskCategory), (t)-[]-(f:Feature), (t)-[]-(u:User), (t)-[]-(tr:TaskTracker)',
//     	'WHERE lower(t.subject) CONTAINS lower({exp})',
//     	'MATCH (n:Task)',
//     	'WHERE lower(n.subject) CONTAINS lower({exp})',
// 		'RETURN tr,t,s,p,c,f,u,COUNT(n) as len',
// 		'ORDER BY lower(t.subject)',
// 		'SKIP {from}',
// 		'LIMIT {limit}'
// 	];

// 	var params = {
// 		from: Number(from),
// 		limit: Number(limit),
// 		exp: exp
// 	};

// 	return neodb.cypherAsync({
// 		query : query.join('\n'),
// 		params: params
// 	});
// }

function getAllTasksWithExpSorted(from,limit,exp, sortableOption) {
	console.log('\nservice: getAllTasksWithExpSorted: '+ exp +'\n');
	console.log('serwis getAllTasksWithExpSorted:\n [from:'+from + ' /limit:'+ limit + ' /exp:' +  exp + ' /sortableOption:' +  sortableOption+']');
	var sortableOptionExp = 'ORDER BY';

	if (sortableOption === 'estimatedHours' || sortableOption === 'doneRatio') {
		sortableOptionExp += ' t.' + sortableOption; 
	} else {
		sortableOptionExp += ' lower(t.' + sortableOption + ')';
	}

	var query = [
    	'MATCH (t:Task),(t)-[]-(s:TaskStatus), (t)-[]-(p:TaskPriority), (t)-[]-(c:TaskCategory), (t)-[]-(f:Feature), (t)-[]-(u:User), (t)-[]-(tr:TaskTracker)',
    	'WHERE lower(t.subject) CONTAINS lower({exp})',
    	'MATCH (n:Task)',
    	'WHERE lower(n.subject) CONTAINS lower({exp})',
		'RETURN tr,t,s,p,c,f,u,COUNT(n) as len',
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


function getAllTasksWithExpSortedFiltered(from,limit,exp, sortableOption, filters) {
	console.log('\nservice: getAllTasksWithExpSortedFiltered: '+ exp +'\n');
	console.log('serwis: [from:'+from + ' /limit:'+ limit + ' /exp:' +  exp + ' /sortableOption:' +  sortableOption+']');
	
	var sortableOptionExp = 'ORDER BY';
	var filterExp = '';
	var filterExp2 = '';

	var authorId = filters.authorId;
	var featureId = filters.featureId;
	var statusId = filters.statusId;
	var priorityId = filters.priorityId;
	var categoryId= filters.categoryId;
	var trackerId= filters.trackerId;
	var minHours = filters.minHours;
	var maxHours = filters.maxHours;


	if (sortableOption === 'estimatedHours' || sortableOption === 'doneRatio') {
		sortableOptionExp += ' t.' + sortableOption; 
	} else {
		sortableOptionExp += ' lower(t.' + sortableOption + ')';
	}


	if(authorId.length !== 0) {
		filterExp += ' AND ID(u) in [' + authorId + ']';
	}
	if(featureId.length !== 0) {
		filterExp += ' AND ID(f) in [' + featureId + ']';
	}
	if(statusId.length !== 0) {
		filterExp += ' AND ID(s) in [' + statusId + ']';
	}
	if(priorityId.length !== 0) {
		filterExp += ' AND ID(p) in [' + priorityId + ']';
	}
	if(categoryId.length !== 0) {
		filterExp += ' AND ID(c) in [' + categoryId + ']';
	}
	if(trackerId.length !== 0) {
		filterExp += ' AND ID(tr) in [' + trackerId + ']';
	}
	if(minHours) {
		filterExp += ' AND t.estimatedHours >= ' + minHours;
	}
	if(maxHours) {
		filterExp += ' AND t.estimatedHours <= ' + maxHours;
	}
	console.log(filterExp);

	if(authorId.length !== 0) {
		filterExp2 += ' AND ID(uu) in [' + authorId + ']';
	}
	if(featureId.length !== 0) {
		filterExp2 += ' AND ID(ff) in [' + featureId + ']';
	}
	if(statusId.length !== 0) {
		filterExp2 += ' AND ID(ss) in [' + statusId + ']';
	}
	if(priorityId.length !== 0) {
		filterExp2 += ' AND ID(pp) in [' + priorityId + ']';
	}
	if(categoryId.length !== 0) {
		filterExp2 += ' AND ID(cc) in [' + categoryId + ']';
	}
	if(trackerId.length !== 0) {
		filterExp2 += ' AND ID(trtr) in [' + trackerId + ']';
	}
	if(minHours) {
		filterExp2 += ' AND n.estimatedHours >= ' + minHours;
	}
	if(maxHours) {
		filterExp2 += ' AND n.estimatedHours <= ' + maxHours;
	}
	console.log(filterExp2);


	var query = [
    	'MATCH (t:Task),(t)-[]-(s:TaskStatus), (t)-[]-(p:TaskPriority), (t)-[]-(c:TaskCategory), (t)-[]-(f:Feature), (t)-[]-(u:User), (t)-[]-(tr:TaskTracker)',
    	'WHERE lower(t.subject) CONTAINS lower({exp})',
    	filterExp,
    	'MATCH (n:Task),(n)-[]-(ss:TaskStatus), (n)-[]-(pp:TaskPriority), (n)-[]-(cc:TaskCategory), (n)-[]-(ff:Feature), (n)-[]-(uu:User), (n)-[]-(trtr:TaskTracker)',
    	'WHERE lower(n.subject) CONTAINS lower({exp})',
    	filterExp2,
		'RETURN tr,t,s,p,c,f,u,COUNT(n) as len',
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


function createTask(featureId, subject, description, trackerId, statusId, priorityId, authorId, categoryId, estimatedHours, doneRatio, startDate, dueDate){
  	console.log('service: tworzy mi nowy Task\n\n');
  	console.log(featureId);
  	console.log(subject);
  	console.log(description);
  	console.log(statusId);
  	console.log(priorityId);
  	console.log(authorId);
  	console.log(trackerId);
  	console.log(categoryId);
  	console.log(estimatedHours);
  	console.log(doneRatio);
  	console.log(startDate);
  	console.log(dueDate);

  	var query = [
		'MATCH (s:TaskStatus),(c:TaskCategory),(p:TaskPriority),(u:User),(f:Feature),(tr:TaskTracker)',
		'WHERE ID(s)={statusId} AND ID(c)={categoryId} AND ID(p)={priorityId} AND ID(u)={authorId} AND ID(f)={featureId} AND ID(tr)={trackerId}',
		'WITH s,c,p,u,f,tr',
		'CREATE (t:Task {subject: {subject}, description: {description}, estimatedHours: {estimatedHours}, doneRatio: {doneRatio}, startDate: {startDate}, dueDate: {dueDate} })',
		'CREATE (t)-[:HAS_STATUS]->(s)',
		'CREATE (t)-[:HAS_CATEGORY]->(c)',
		'CREATE (t)-[:HAS_PRIORITY]->(p)',
		'CREATE (t)-[:HAS_AUTHOR]->(u)',
		'CREATE (t)-[:IS_IN_FEATURE]->(f)',
		'CREATE (t)-[:IS_TRACKED_BY]->(tr)'
  	];

	var params = {
	  	featureId: Number(featureId),
	  	subject: subject,
	  	description: description,
	  	statusId: Number(statusId),
	  	trackerId: Number(trackerId),
	  	priorityId: Number(priorityId),
	  	authorId: Number(authorId),
	  	categoryId: Number(categoryId),
	  	estimatedHours: Number(estimatedHours),
	  	doneRatio: Number(doneRatio),
	  	dueDate: dueDate,
	  	startDate: startDate
	};

	return neodb.cypherAsync({
		query : query.join('\n'),
		params: params
	});
}

function updateTask(id, featureId, subject, description, trackerId, statusId, priorityId, authorId, categoryId, estimatedHours, doneRatio, startDate, dueDate)
{
	console.log('serwis: Task udpate\n\n');
  	console.log('featureId'+featureId);
  	console.log('subject'+subject);
  	console.log('description'+description);
  	console.log('statusId'+statusId);
  	console.log('priorityId'+priorityId);
  	console.log('authorId'+authorId);
  	console.log('trackerId'+trackerId);
  	console.log('categoryId'+categoryId);
  	console.log('estimatedHours'+estimatedHours);
  	console.log('doneRatio'+doneRatio);
  	console.log('startDate'+startDate);
  	console.log('dueDate'+dueDate);

    var query = [
        'MATCH (s:TaskStatus),(c:TaskCategory),(p:TaskPriority),(u:User),(f:Feature),(tr:TaskTracker),(t:Task)',
		'WHERE ID(s)={statusId} AND ID(c)={categoryId} AND ID(p)={priorityId} AND ID(u)={authorId} AND ID(f)={featureId} AND ID(tr)={trackerId}',
        'WITH s,c,p,u,f,tr',
        'MATCH (t:Task)',
        'WHERE ID(t) = {id}',
        'OPTIONAL MATCH (t)-[r]-()', //drops p's relations
        'DELETE r',
        'WITH t,s,c,p,u,f,tr',
        'MERGE (t)-[:HAS_STATUS]->(s)',
        'MERGE (t)-[:HAS_CATEGORY]->(c)',
        'MERGE (t)-[:HAS_PRIORITY]->(p)',
        'MERGE (t)-[:HAS_AUTHOR]->(u)',
        'MERGE (t)-[:IS_IN_FEATURE]->(f)',
   		'MERGE (t)-[:IS_TRACKED_BY]->(tr)',
        'SET t.subject = {subject}, t.description={description}, t.estimatedHours={estimatedHours}, t.doneRatio={doneRatio}, t.dueDate={dueDate}, t.startDate={startDate}',
        'return t'
    ];

    var params = {
    	id: Number(id),
	  	featureId: Number(featureId),
	  	subject: subject,
	  	description: description,
	  	statusId: Number(statusId),
	  	trackerId: Number(trackerId),
	  	priorityId: Number(priorityId),
	  	authorId: Number(authorId),
	  	categoryId: Number(categoryId),
	  	estimatedHours: Number(estimatedHours),
	  	doneRatio: Number(doneRatio),
	  	dueDate: dueDate,
	  	startDate: startDate
    };

    return neodb.cypherAsync({
    query : query.join('\n'),
    params: params
    });
}

function getFeaturesExp(exp){
	//console.log('zapytanie exp: '+ exp);
	var query = [
	  	'MATCH (f:Feature)',
		'WHERE lower(f.subject) CONTAINS lower({exp})',
  		'MATCH (n:Feature)',
		'WHERE lower(n.subject) CONTAINS lower({exp})',
		'RETURN f, COUNT(n) as len'
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
		'WHERE lower(u.firstName) CONTAINS lower({exp})',
		'OR lower(u.lastName) CONTAINS lower({exp})',
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