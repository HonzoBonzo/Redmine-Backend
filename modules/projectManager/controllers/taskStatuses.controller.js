var express = require('express');
var service = require('./../services/taskStatuses.service');

function deleteStatus(req, res, next) {
	console.log('Controller deleteStatus');
 	var id = req.params[0];
 	service.deleteStatus(id).then(function(data){
  		res.send(data[0]);
  	});
}

function getStatus (req, res, next) {
	console.log('Controller getStatus');
 	var id = req.params[0];
 	service.getStatus(id).then(function(data){
  		res.send(data[0]);
 	});
}

function getAllStatuses(req, res, next) {
	console.log('Controller getAllStatuses');
 	service.getAllStatuses().then(function(data){
  		res.send(data);
 });
}

function createStatus(req, res, next) {
	console.log('Controller createStatus');
	service.createStatus(req.body.name).then(function(data){
		res.send(data[0]);
	});
}

function updateStatus(req, res, next) {
	console.log('Controller updateStatus');
  	var id = req.params[0];
  	service.updateStatus(id, req.body.name).then(function(data){
  		res.send(data[0]);
 	});
}

module.exports = {
  getStatus: getStatus,
  updateStatus: updateStatus,
  createStatus: createStatus,
  deleteStatus: deleteStatus,
  getAllStatuses: getAllStatuses
};
