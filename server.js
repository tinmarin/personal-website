var express    = require('express');
var	bodyParser = require('body-parser');
var morgan     = require('morgan');
var path 	   = require('path');
var favicon    = require('serve-favicon');
var compress   = require('compression');
var fs 		   = require('fs');

var app = express();
var port = process.env.PORT || 3000;

app.use(compress());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
	next();
});

app.use(express.static(__dirname + '/client'));

app.get('*', function(req, res) {
	console.log(req.header);
	res.sendFile(path.join(__dirname + '/client/index.html'));
});

app.listen(port);
console.log('Listening on port: ' + port);
