var express = require('express');
var service = require('./../services/projects.service');

function deleteProject(req, res, next) {
 var id = req.params[0];
 service.deleteProject(id).then(function(data){
  res.send(data[0]);
  });
}

function getProject (req, res, next) {
 var id = req.params[0];
 service.getProject(id).then(function(data){
  res.send(data[0]);
 });
}

function getAllProjects(req, res, next) {
 service.getAllProjects().then(function(data){
  res.send(data);
 });
}

function createProject(req, res, next) {
  console.log('tworze nowy project');
 service.createProject(req.body.name,  req.body.description, req.body.identifier ).then(function(data){
  res.send(data[0]);
 });
}

function updateProject(req, res, next) {
  var id = req.params[0];
  service.updateProject(id,req.body.name, req.body.description, req.body.identifier ).then(function(data){
  res.send(data[0]);
 });
}

// function getRecordsAmount(req, res, next) {
//     //console.log('get: ilosc rekordow');
//     service.getRecordsAmount().then(function(data){
//       res.send(data[0]);
//     });
// }

// function getLoadPagesSearch(req, res, next) {
//   var from = req.params[0];
//   var limit = req.params[1];
//   var exp ='';
//   console.log("strony: "+ from +"- limit "+ limit + "exp " + 'blank\n\n');
//   //cos();
//   service.getLoadPagesSearch(from, limit, exp).then(function(data){
//     res.send(data);
//   });
// }

function getAllProjectsWithExpSorted(req, res, next) {
  var from = req.params[0];
  var limit = req.params[1];
  var exp = req.params[2];
  var sortableOption = req.params[3];
  console.log('['+from + '/'+ limit + '/' +  exp+'/' +  sortableOption+']');

  service.getAllProjectsWithExpSorted(from, limit, exp, sortableOption).then(function(data){
    res.send(data);
  });
}

// function getChangeList(req, res, next) {
//     var exp = req.params[0] ;
//     console.log(exp);
//     service.getChangeList(exp).then(function(data){
//       res.send(data);
//     });
// }

function checkRelations(req, res, next) {
  var id = req.params[0];
  console.log('controller: projects checkRelations to id: ' + id);
  service.checkRelations(id).then(function(data){
    res.send(data[0]);
  });
}



module.exports = {
  getProject: getProject,
  updateProject: updateProject,
  createProject: createProject,
  deleteProject: deleteProject,
  getAllProjects: getAllProjects,
  //getRecordsAmount: getRecordsAmount,
  //getLoadPagesSearch: getLoadPagesSearch,
  getAllProjectsWithExpSorted: getAllProjectsWithExpSorted,
  //getChangeList: getChangeList,
  checkRelations: checkRelations
};
