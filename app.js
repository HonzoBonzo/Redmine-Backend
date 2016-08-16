
var express = require('express');
var expressSession = require('express-session');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var projectManagerRouter = require('./modules/projectManager/routes/projectManager.router');
var authService = require('./modules/auth/services/auth.service');
var passport = require('passport');
var authRouter = require('./modules/auth/routes/auth.router');


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", 'POST, GET, PUT, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Credentials", true);

    next();
});

// app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
	secret: 'secret',
	resave: false,
	saveUninitialized: true,
	maxAge: 10000000000000
}));

app.use(passport.initialize());
app.use(passport.session());

authService.initPassport();

app.use('/auth',authRouter);
app.use(function(req, res, next) {
	if(req.isAuthenticated()) {
		next();
	} else {
		res.json({
			success: false,
			message: 'Not authenticated app.js'
		}).status(403);
	}
});

app.use(projectManagerRouter);



process.on('unhandledRejection', function(reason, p){
    console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
    // application specific logging here
});

app.listen(2000, function () {
  console.log('Example app listening on port 2000!');
});