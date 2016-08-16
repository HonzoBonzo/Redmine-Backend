var express = require('express');
// @TODO
// change uppercase filename to lowercase
var service = require('./../services/@component.service');

function delete@component(req, res, next) {
 var id = req.params[0];
 service.delete@component(id).then(function(data){
  res.send(data[0]);
  });
}

function get@component (req, res, next) {
 var id = req.params[0];
 service.get@component(id).then(function(data){
  res.send(data[0]);
 });
}

function getAll@component(req, res, next) {
 service.getAll@component().then(function(data){
  res.send(data);
 });
}

function create@component(req, res, next) {
 service.create@component(req.body.name, req.body.identifier, req.body.description).then(function(data){
  res.send(data[0]);
 });
}

function update@component(req, res, next) {
  var id = req.params[0];
  service.update@component(id, req.body.name, req.body.identifier, req.body.description).then(function(data){
  res.send(data[0]);
 });
}

module.exports = {
  get@component: get@component,
  update@component: update@component,
  create@component: create@component,
  delete@component: delete@component,
  getAll@component: getAll@component
};
