var express = require('express');
var service = require('./../services/users.service');

function deleteUser(req, res, next) {
 var id = req.params[0];
 service.deleteUser(id).then(function(data){
  res.send(data[0]);
  });
}

function getUserById (req, res, next) {
  console.log('controller: getUserById');
 var id = req.params[0];
 service.getUserById(id).then(function(data){
  res.send(data[0]);
 });
}

function getUserBy(req, res, next) {
  console.log('controller: getUserBy');
  var propertyName = req.body.propertyName;
  var propertyValue = req.body.propertyValue;

  service.getUserBy(propertyName,propertyValue).then(function(data){
    res.send(data);
  });
}

function checkLoginFree(req, res, next) {
  console.log('controller: checkLoginFree');
  var login = req.body.login;

  service.checkLoginFree(login).then(function(data){
    res.send(data);
  });
}

function getAllUsers(req, res, next) {
  console.log('controller: getAllUsers');
 service.getAllUsers().then(function(data){
  res.send(data);
 });
}

function getAllUsersWithExpSorted(req, res, next) {
  console.log('controller: getAllUsersWithExpSorted');
  var from = req.body.from;
  var limit = req.body.limit;
  var exp = req.body.exp;
  var sortableOption = req.body.sortableOption;
 service.getAllUsersWithExpSorted(from, limit, exp, sortableOption).then(function(data){
  res.send(data);
 });
}

function createUser(req, res, next) {
 service.createUser(req.body.login, req.body.password, req.body.firstName, req.body.lastName).then(function(data){
  res.send(data);
 });
}

function updateUser(req, res, next) {
  // var id = req.params[0];
  service.updateUser(req.body.id, req.body.password, req.body.firstName, req.body.lastName).then(function(data){
  res.send(data[0]);
 });
}

module.exports = {
  getUserById: getUserById,
  updateUser: updateUser,
  createUser: createUser,
  deleteUser: deleteUser,
  getAllUsers: getAllUsers,
  getUserBy: getUserBy,
  checkLoginFree: checkLoginFree,
  getAllUsersWithExpSorted: getAllUsersWithExpSorted
};
