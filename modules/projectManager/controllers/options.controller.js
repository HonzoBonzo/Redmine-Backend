var express = require('express');
var service = require('./../services/options.service');

function deleteOption(req, res, next) {
  console.log('Controller deleteOption');
  var id = req.params[0];
  service.deleteOption(id).then(function(data){
      res.send(data[0]);
    });
}


function updateOption(req, res, next) {
  console.log('Controller updateOption');
    var id = req.params[0];
    service.updateOption(id, req.body.name).then(function(data){
      res.send(data[0]);
  });
}

function createOption(req, res, next) {
  console.log('Controller createOption');
    var label = req.body.label;
    var name = req.body.name;
    service.createOption(req.body.label, req.body.name).then(function(data){
      res.send(data[0]);
  });
}

function checkRelations(req, res, next) {
  var id = req.params[0];
  console.log('controller: options checkRelations to id: ' + id);
  service.checkRelations(id).then(function(data){
    res.send(data[0]);
  });
}


module.exports = {
  updateOption: updateOption,
  deleteOption: deleteOption,
  createOption: createOption,
  checkRelations: checkRelations
};
