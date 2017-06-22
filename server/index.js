var express = require('express');
var app = express();

var version = "0.0.1";

app.get('/', function(req, res) {
    res.send(version);
	res.end();
});

app.get('/push_gif', function(req, res) {
	console.log(req);

	
    res.send('success');
	res.end();
});

app.listen(3330);
