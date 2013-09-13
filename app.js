var express = require('express');
app = express();

app.set('title', 'd3js playground');

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

app.use(express.static('./web'));
app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});


function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.send(500, { error: 'Something blew up!' });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

app.get('/', function(req,res) {
  res.sendfile('web/index.html');
});

//files
app.get(/^(.+)$/, function(req, res) {
  res.sendfile('public/' + req.params[0]);
});


app.listen(3000, function () {
  console.log('Development server running on http://localhost:3000');
});

