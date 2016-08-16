var express = require('express');
var bodyParser = require('body-parser');
var authController = require('../controllers/auth.controller');
var userController = require('../../projectManager/controllers/users.controller');
var authRouter = new express.Router();


authRouter.post('/login', authController.login);
authRouter.get('/logout', authController.logout);
authRouter.get('/getLoggedUser', authController.getLoggedUser);
authRouter.post('/register', userController.createUser);
authRouter.post('/check', userController.checkLoginFree);

module.exports = authRouter;