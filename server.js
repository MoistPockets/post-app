/*
app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(1337);
console.log('Smoothly operating');
*/
var express = require('express');
var app = express();
var path  = require('path');
var adminRouter = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/first');

adminRouter.use(function(req, res, next){
	console.log(req.method, req.url);
	next();
});

adminRouter.param('name', function(req, res, next, name){
	console.log('Currently validating ' + name);
	req.name = name; 
	next();
});


adminRouter.get("/", function(req, res){
	res.send('This is the dashboard');
});

adminRouter.get("/users/:name", function(req, res){
	res.send('This is the users display ' + req.name +".");
});

adminRouter.get("/posts", function(req, res){
	res.send('This is the message board');
});
app.use('/admin', adminRouter);

app.route('/login')
	.get(function(req, res){
		res.send('Login Form');
	})

	.post(function(req, res){
		console.log('Processing');
		res.send('Logging you in');
	})

app.listen(1337);