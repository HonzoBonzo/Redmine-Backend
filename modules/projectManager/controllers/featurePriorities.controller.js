var express = require('express');
var service = require('./../services/featurePriorities.service');

function deletePriority(req, res, next) {
 var id = req.params[0];
 service.deletePriority(id).then(function(data){
  res.send(data[0]);
  });
}

function getPriority (req, res, next) {
 var id = req.params[0];
 service.getPriority(id).then(function(data){
  res.send(data[0]);
 });
}

function getAllPriorities(req, res, next) {
 service.getAllPriorities().then(function(data){
  res.send(data);
 });
}

function createPriority(req, res, next) {
 service.createPriority(req.body.name).then(function(data){
  res.send(data[0]);
 });
}

function updatePriority(req, res, next) {
  var id = req.params[0];
  service.updatePriority(id, req.body.name).then(function(data){
  res.send(data[0]);
 });
}

module.exports = {
  getPriority: getPriority,
  updatePriority: updatePriority,
  createPriority: createPriority,
  deletePriority: deletePriority,
  getAllPriorities: getAllPriorities
};
