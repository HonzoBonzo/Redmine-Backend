var passport = require('passport');
var authService = require('../services/auth.service');
var userService = require('../../projectManager/services/users.service');
var express = require('express');

module.exports = {
  login: login,
  logout: logout,
  getLoggedUser: getLoggedUser
};



function login(req, res, next) {


    passport.authenticate('local', function(err, user, info) {

        if (err) {
            return res.json({
                success: false,
                'a' : 'a',
                message: err
            }).status(403);
        }

        if (!user) { 
            return res.json({
                success: false,
                'a' : 'b',

                message: info.message
            }).status(403);
        }
        // console.log('123123213213');
        // console.log(user);
        // console.log('123123213213');
        
        req.logIn(user, function(err) {
          // console.log(req);

          if (err) {
              // console.log('asdasd');
              // console.log(err);
              // console.log('asdasd');

              return res.json({
                  success: false,
                  'a' : 'c',
                  message: err
              }).status(403);
          }

          return res.json({
              success: true,
              user: {
                  login: user.login,
                  id: user.id,
                  firstName: user.firstName,
                  lastName: user.lastName
              }
          });
        });

    })(req, res, next);

}

function logout(req, res, next) {
    req.logout(); //wylogowanie uzytkownika na bazie w backendzie
    res.json({
      success: true,
      message: 'User is succesfully logged out.'
    });

}

function getLoggedUser(req,res,next) {
    if(req.isAuthenticated()) {
      userService.getUserById(req.user.id).then(function(user) {
        console.log('user jest zalogowany');
        console.log(user);
        res.json({
          success: true,
          message: 'User is logged',
          user: {
            id: user.id,
            login: user.login,
            firstName: user.firstName,
            lastName: user.lastName
          }
        });
      }).catch(function(err) {
        res.json({
          success: false,
          message: err,
          user: null
        });
      });
    } else {
      res.json({
        success: false, 
        message: 'Not authenticated auth.controller.js',
        user: null
      });
    }
  
}