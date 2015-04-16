// Config in local file:
var config = require('./config.js');

// Usage example:
//var db = require('orchestrate')(config.dbKey);


var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Hello World!  Your key is: '+config.sampleKey);
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
