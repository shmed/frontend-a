/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var lessMiddleware = require('less-middleware');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 5000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  
  /* Setting up less compiler*/
  app.use(lessMiddleware('/less', {
    dest: '/css',
    pathRoot: path.join(__dirname, 'public')
  }));
  
  /* */
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

/* Index page*/
app.get('/', routes.index);
/*
app.get('/fonts/:file',function(req,res) {
    res.sendfile(path.join(__dirname,'node_modules','twitter-bootstrap-3.0.0','fonts', req.params.file));
});
*/
/* Routes to typeahead.js needed files*/
/*
app.get('/js/typeaheadjs/:file',function(req,res) {
    res.sendfile(path.join(__dirname,'node_modules','typeahead.js','dist', req.params.file));
});
8?
/* Creating the server */
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
