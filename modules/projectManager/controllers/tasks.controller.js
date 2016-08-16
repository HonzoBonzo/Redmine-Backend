var express = require('express');
var service = require('./../services/tasks.service');
var vS = require('./../services/validation.service'); //validationService

function deleteTask(req, res, next) {
 var id = req.params[0];
  console.log('controller deleteTask: id: '+ id +'\n!\n');
 service.deleteTask(id).then(function(data){
  res.send(data[0]);
  });
}

function getTask (req, res, next) {
 var id = req.params[0];
 service.getTask(id).then(function(data){
  res.send(data[0]);
 });
}

function getAllTasks(req, res, next) {
 service.getAllTasks().then(function(data){
  res.send(data);
 });
}

function createTask(req, res, next) {
  console.log('controller createTask\n!\n!\n!\n');
  console.log(req.body);
  console.log('');

  var whetherAdd = false;
  var featureIdVal = vS.validateId(req.body.featureId); 
  var subjectVal = vS.validateString(req.body.subject);
  var descriptionVal = vS.validateLongString(req.body.description);
  var statusIdVal = vS.validateId(req.body.statusId);
  var priorityIdVal = vS.validateId(req.body.priorityId); 
  var authorIdVal = vS.validateId(req.body.authorId); 
  var trackerIdVal = vS.validateId(req.body.trackerId); 
  var categoryIdVal = vS.validateId(req.body.categoryId); 
  var estimatedHoursVal = vS.validateHoursAmount(req.body.estimatedHours);
  var doneRatioVal = vS.validatePercent(req.body.doneRatio);
  if(
      featureIdVal &&
      subjectVal &&
      descriptionVal &&
      statusIdVal &&
      priorityIdVal &&
      authorIdVal &&
      categoryIdVal &&
      estimatedHoursVal &&
      trackerIdVal &&
      doneRatioVal
  ) {
      whetherAdd = true;
      //console.log('\npoprawna validacja danych');
  }
  else {
      whetherAdd = false;
      console.log('NIEpoprawna validacja danych');
      //alert('Źle wypełniłeś formularz, zobacz, czy czegoś nie pominąłeś!');
  }

  if(whetherAdd) {
    service.createTask(
      Number(req.body.featureId),
      req.body.subject,
      req.body.description, 
      Number(req.body.trackerId),
      Number(req.body.statusId), 
      Number(req.body.priorityId), 
      Number(req.body.authorId),
      Number(req.body.categoryId),
      Number(req.body.estimatedHours),
      Number(req.body.doneRatio),
      req.body.startDate,
      req.body.dueDate
    ).then(function(data){
      res.send(data[0]);
    });
  }



}

function updateTask(req, res, next) {
  console.log('controller updateTask\n!\n!\n!\n');
  console.log(req.body);
  console.log('');
  var taskId = req.params[0];

  var whetherAdd = false;
  var featureIdVal = vS.validateId(req.body.featureId); 
  var subjectVal = vS.validateString(req.body.subject);
  var descriptionVal = vS.validateLongString(req.body.description);
  var statusIdVal = vS.validateId(req.body.statusId);
  var priorityIdVal = vS.validateId(req.body.priorityId); 
  var authorIdVal = vS.validateId(req.body.authorId); 
  var trackerIdVal = vS.validateId(req.body.trackerId); 
  var categoryIdVal = vS.validateId(req.body.categoryId); 
  var estimatedHoursVal = vS.validateHoursAmount(req.body.estimatedHours);
  var doneRatioVal = vS.validatePercent(req.body.doneRatio);
  if(
      featureIdVal &&
      subjectVal &&
      descriptionVal &&
      statusIdVal &&
      priorityIdVal &&
      authorIdVal &&
      categoryIdVal &&
      estimatedHoursVal &&
      trackerIdVal &&
      doneRatioVal
  ) {
      whetherAdd = true;
      //console.log('\npoprawna validacja danych');
  }
  else {
      whetherAdd = false;
      console.log('NIEpoprawna validacja danych');
      //alert('Źle wypełniłeś formularz, zobacz, czy czegoś nie pominąłeś!');
  }

  if(whetherAdd) {
    service.updateTask(
      Number(taskId),
      Number(req.body.featureId),
      req.body.subject,
      req.body.description, 
      Number(req.body.trackerId),
      Number(req.body.statusId), 
      Number(req.body.priorityId), 
      Number(req.body.authorId),
      Number(req.body.categoryId),
      Number(req.body.estimatedHours),
      Number(req.body.doneRatio),
      req.body.startDate,
      req.body.dueDate
    ).then(function(data){
      res.send(data[0]);
    });
  }
}


// function getAllTasksWithExp(req, res, next) {
//   console.log('\n\ncontroller: getAllTasksWithExp');
//   var from = req.params[0];
//   var limit = req.params[1];
//   var exp = req.params[2];
//   console.log('['+from + '/'+ limit + '/' +  exp+']');


//   if( vS.validatePageNumber(from) && vS.validatePageNumber(limit) && vS.validateString(exp)) {
//     service.getAllTasksWithExp(from,limit,exp).then(function(data){ 
//         res.send(data);
//     });
//   } else {
//     console.log('zle dane');
//   }
// }

function getAllTasksWithExpSorted(req, res, next) {
  console.log('\n\ncontroller: getAllTasksWithExpSorted:');
  var from = req.params[0];
  var limit = req.params[1];
  var exp = req.params[2];
  var sortableOption = req.params[3];
  console.log('['+from + '/'+ limit + '/' +  exp+'/' +  sortableOption+']');


  service.getAllTasksWithExpSorted(from,limit,exp,sortableOption).then(function(data){ 
      res.send(data);
  });
}


function getAllTasksWithExpSortedFiltered(req, res, next) {
  console.log('\n\ncontroller: getAllTasksWithExpSortedFiltered:');
  
  var from = req.body.from;
  var limit = req.body.limit;
  var exp = req.body.exp;
  var sortableOption = req.body.sortableOption;

  var authorId = req.body.filters.authorId;
  var featureId = req.body.filters.featureId;
  var statusId = req.body.filters.statusId;
  var priorityId = req.body.filters.priorityId;
  var categoryId= req.body.filters.categoryId;
  var trackerId= req.body.filters.trackerId;
  var minHours = req.body.filters.minHours;
  var maxHours = req.body.filters.maxHours;


  console.log('['+from + '/'+ limit + '/' +  exp+'/' +  sortableOption+']');

  var filters = req.body;
  console.log(filters);

  service.getAllTasksWithExpSortedFiltered(from,limit,exp,sortableOption,filters.filters).then(function(data){ 
      res.send(data);
  });
}



// function getAllTasksNoExp(req, res, next) {
//   console.log('\n\ncontroller: getAllTasksNoExp');
//   var from = req.params[0];
//   var limit = req.params[1];
//   var exp = '';
//   console.log('['+from + '/'+ limit + '/' + 'exp'+']');

//   if( vS.validatePageNumber(from) && vS.validatePageNumber(limit)) {
//     service.getAllTasksWithExp(from,limit,exp).then(function(data){
//         res.send(data);
//     });
//   } else {
//     console.log('zle dane');
//   }
// }


// function getAllTasksNoExpSorted(req, res, next) {
//   console.log('\n\ncontroller: getAllTasksNoExpSorted:');
//   var from = req.params[0];
//   var limit = req.params[1];
//   var exp = '';
//   var sortableOption = req.params[2];
//   console.log('['+from + ' /'+ limit + ' /'+'blank'+' /' +  sortableOption+']');


//   service.getAllTasksWithExpSorted(from,limit,exp,sortableOption).then(function(data){ 
//     res.send(data);
//   });

// }




function getFeatures(req, res, next) {
  var exp = '';
  console.log('appR: features projects with: ' + exp + 'blank');
  service.getFeaturesExp(exp).then(function(data){
    res.send(data);
  });
}

function getFeaturesExp(req, res, next) {
  var exp = req.params[0];
  console.log('appR: features projects with: ' + exp);
  service.getFeaturesExp(exp).then(function(data){
    res.send(data);
  });
}

function getUsers(req, res, next) {
  var exp = '';
  console.log('appR: features users with: ' + exp + 'blank');
  service.getUsersExp(exp).then(function(data){
    res.send(data);
  });
}

function getUsersExp(req, res, next) {
  var exp = req.params[0];
  console.log('appR: features projects with: ' + exp);
  service.getUsersExp(exp).then(function(data){
    res.send(data);
  });
}


module.exports = {
  getTask: getTask,
  updateTask: updateTask,
  createTask: createTask,
  deleteTask: deleteTask,
  getAllTasks: getAllTasks,
  getFeatures: getFeatures,
  getFeaturesExp: getFeaturesExp,
  getUsersExp: getUsersExp,
  getUsers: getUsers,
 // getAllTasksWithExp: getAllTasksWithExp,
 // getAllTasksNoExp: getAllTasksNoExp,
 // getAllTasksNoExpSorted: getAllTasksNoExpSorted,
  getAllTasksWithExpSorted: getAllTasksWithExpSorted,
  getAllTasksWithExpSortedFiltered: getAllTasksWithExpSortedFiltered

};
