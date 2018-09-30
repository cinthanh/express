var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.listen(3333,function() {
    console.log('Server running ...');
});