var express = require('express');
var service = require('./../services/taskTracker.service');

function deleteTracker(req, res, next) {
 var id = req.params[0];
 service.deleteTracker(id).then(function(data){
  res.send(data[0]);
  });
}

function getTracker (req, res, next) {
 var id = req.params[0];
 service.getTracker(id).then(function(data){
  res.send(data[0]);
 });
}

function getAllTrackers(req, res, next) {
 service.getAllTrackers().then(function(data){
  res.send(data);
 });
}

function createTracker(req, res, next) {
 service.createTracker(req.body.name).then(function(data){
  res.send(data[0]);
 });
}

function updateTracker(req, res, next) {
  var id = req.params[0];
  service.updateTracker(id, req.body.name).then(function(data){
  res.send(data[0]);
 });
}

module.exports = {
  getTracker: getTracker,
  updateTracker: updateTracker,
  createTracker: createTracker,
  deleteTracker: deleteTracker,
  getAllTrackers: getAllTrackers
};
