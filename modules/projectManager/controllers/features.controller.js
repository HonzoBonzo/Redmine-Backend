var express = require('express');
var service = require('./../services/features.service');
var vS = require('./../services/validation.service'); //validationService

function deleteFeature(req, res, next) {
 var id = req.params[0];
 service.deleteFeature(id).then(function(data){
  res.send(data[0]);
  });
}

function getFeature (req, res, next) {
 var id = req.params[0];
 service.getFeature(id).then(function(data){
  res.send(data[0]);
 });
}

function getAllFeatures(req, res, next) {
 service.getAllFeatures().then(function(data){
  res.send(data);
 });
}

function createFeature(req, res, next) {
  console.log('service createFeature\n!\n!\n!\n');
  console.log(req.body);
  console.log('');

  var whetherAdd = false;
  var projectIdVal = vS.validateId(req.body.projectId); 
  var subjectVal = vS.validateString(req.body.subject);
  var descriptionVal = vS.validateLongString(req.body.description);
  var statusIdVal = vS.validateId(req.body.statusId);
  var priorityIdVal = vS.validateId(req.body.priorityId); 
  var authorIdVal = vS.validateId(req.body.authorId); 
  var categoryIdVal = vS.validateId(req.body.categoryId); 
  var estimatedHoursVal = vS.validateId(req.body.estimatedHours);
  if(
      projectIdVal &&
      subjectVal &&
      descriptionVal &&
      statusIdVal &&
      priorityIdVal &&
      authorIdVal &&
      categoryIdVal &&
      estimatedHoursVal
  ) {
      whetherAdd = true;
      console.log('poprawna validacja danych');
  }
  else {
      whetherAdd = false;
      console.log('NIEpoprawna validacja danych');
      //alert('Źle wypełniłeś formularz, zobacz, czy czegoś nie pominąłeś!');
  }

  if(whetherAdd) {
    service.createFeature(
      Number(req.body.projectId),
      req.body.subject,
      req.body.description, 
      Number(req.body.statusId), 
      Number(req.body.priorityId), 
      Number(req.body.authorId),
      Number(req.body.categoryId),
      Number(req.body.estimatedHours)
    ).then(function(data){
      res.send(data[0]);
    });
  }



}

function updateFeature(req, res, next) {
  console.log('service updateFeature\n!\n!\n!\n');
  console.log(req.body);
  console.log('');

  var featureId = req.params[0];

  var whetherAdd = false;
  var featureIdVal = vS.validateId(featureId); 
  var projectIdVal = vS.validateId(req.body.projectId); 
  var subjectVal = vS.validateString(req.body.subject);
  var descriptionVal = vS.validateLongString(req.body.description);
  var statusIdVal = vS.validateId(req.body.statusId);
  var priorityIdVal = vS.validateId(req.body.priorityId); 
  var authorIdVal = vS.validateId(req.body.authorId); 
  var categoryIdVal = vS.validateId(req.body.categoryId); 
  var estimatedHoursVal = vS.validateId(req.body.estimatedHours);
  if(
      featureIdVal &&
      projectIdVal &&
      subjectVal &&
      descriptionVal &&
      statusIdVal &&
      priorityIdVal &&
      authorIdVal &&
      categoryIdVal &&
      estimatedHoursVal
  ) {
      whetherAdd = true;
      console.log('poprawna validacja danych');
  }
  else {
      whetherAdd = false;
      console.log('NIEpoprawna validacja danych');
      //alert('Źle wypełniłeś formularz, zobacz, czy czegoś nie pominąłeś!');
  }

  if(whetherAdd) {
    service.updateFeature(
      Number(featureId),
      Number(req.body.projectId),
      req.body.subject,
      req.body.description, 
      Number(req.body.statusId), 
      Number(req.body.priorityId), 
      Number(req.body.authorId),
      Number(req.body.categoryId),
      Number(req.body.estimatedHours)
    ).then(function(data){
      res.send(data[0]);
    });
  }
}


function getAllFeaturesWithExpSorted(req, res, next) {
  console.log('\n\ncontroller: getAllFeaturesWithExpSorted');
  var from = req.params[0];
  var limit = req.params[1];
  var exp = req.params[2];
  var sortableOption = req.params[3];
  console.log('['+from + '/'+ limit + '/' +  exp+'/' +  sortableOption+']');


  if( vS.validatePageNumber(from) && vS.validatePageNumber(limit)) {
    service.getAllFeaturesWithExpSorted(from,limit,exp,sortableOption).then(function(data){ 
        res.send(data);
    });
  }else {
    console.log('zle dane');
  }

}
// function getAllFeaturesNoExp(req, res, next) {
//   console.log('\n\ncontroller: getAllFeaturesNoExp');
//   var from = req.params[0];
//   var limit = req.params[1];
//   var exp = '';
//   console.log('['+from + '/'+ limit + '/' + 'blank'+']');

//   if( vS.validatePageNumber(from) && vS.validatePageNumber(limit)) {
//     service.getAllFeaturesWithExp(from,limit,exp).then(function(data){
//         res.send(data);
//     });
//   }else {
//     console.log('zle dane');
//   }

// }

function getProjects(req, res, next) {
  var exp = '';
  console.log('appR: features projects with: ' + exp + 'blank');
  service.getProjectsExp(exp).then(function(data){
    res.send(data);
  });
}

function getProjectsExp(req, res, next) {
  var exp = req.params[0];
  console.log('appR: features projects with: ' + exp);
  service.getProjectsExp(exp).then(function(data){
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

function checkRelations(req, res, next) {
  var id = req.params[0];
  console.log('controller: features checkRelations to id: ' + id);
  service.checkRelations(id).then(function(data){
    res.send(data[0]);
  });
}

module.exports = {
  getFeature: getFeature,
  updateFeature: updateFeature,
  createFeature: createFeature,
  deleteFeature: deleteFeature,
  getAllFeatures: getAllFeatures,
  getProjects: getProjects,
  getProjectsExp: getProjectsExp,
  getAllFeaturesWithExpSorted: getAllFeaturesWithExpSorted,
  //getAllFeaturesNoExp: getAllFeaturesNoExp,
  getUsersExp: getUsersExp,
  getUsers: getUsers,
  checkRelations: checkRelations
};
