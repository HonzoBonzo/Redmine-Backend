var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var userService = require('../../projectManager/services/users.service');

function initPassport () {
//test commita
  passport.use('local', new LocalStrategy({
      usernameField: 'login',
      passwordField: 'password'
  },
      function(login, password, done) {

          userService.getUserBy('login',login).then(function (user) {

              if (!user) {
                return done(null, false, { message: 'Incorrect login.' });
              }

              if (user.password !== password || !user.password) {
                return done(null, false, { message: 'Incorrect password.' });
              }

              // console.log('USERRRRRRRRRRRRRRR');
              // console.log(user);
              // console.log('USERRRRRRRRRRRRRRR');
              return done(null, user) ;

          }).catch(function(err) {
              console.log('Problem z baza danych!!!!!!!!');
              console.log(err);
              console.log('Problem z baza danych!!!!!!!!');

          });
      }
  ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        userService.getUserById(id).then(function(user) {
          done(null, user);
        }).catch(function(){
            done(err, null);
        });
    });

}

module.exports = {
  initPassport: initPassport
};