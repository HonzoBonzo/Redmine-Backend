var express = require('express');
var service = require('./../services/taskCategories.service');


function deleteCategory(req, res, next) {
 var id = req.params[0];

 service.deleteCategory(id).then(function(data){
  res.send(data[0]);
  });
}

function getCategory (req, res, next) {
 var id = req.params[0];
 service.getCategory(id).then(function(data){
  res.send(data[0]);
 });
}

function getAllCategories(req, res, next) {
 service.getAllCategories().then(function(data){
  res.send(data);
 });
}

function createCategory(req, res, next) {
 service.createCategory(req.body.name).then(function(data){
  res.send(data[0]);
 });
}

function updateCategory(req, res, next) {
  var id = req.params[0];
  service.updateCategory(id, req.body.name).then(function(data){
  res.send(data[0]);
 });
}

module.exports = {
  getCategory: getCategory,
  updateCategory: updateCategory,
  createCategory: createCategory,
  deleteCategory: deleteCategory,
  getAllCategories: getAllCategories
};
