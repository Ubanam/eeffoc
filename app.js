//Setting Framework
var express = require('express');
var app = express();
var http = require('http');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Setting Model
var db = require('./models');
console.log(db.CoffeeList);

//Setting Server Side Controller
var router =  require('./router');


app.use(bodyParser.json());
//Setting Routing

app.get('/api/movies',router.allData);
/*
app.get('/api/movies/:id',router.selectData);
app.put('/api/movies/rate/:id',router.addRate);
app.put('/api/movies/:id',router.updateData);
*/
app.put('/api/movies',router.addData);

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/'));


app.get('/', function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
});
//Launch the Server
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

