var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

// everything route after then.

// middleware Node
/*var logger = function(req, res, next) {
    console.log('Logging ...');
    next();
}

// apply middleware
app.use(logger); */

// apply body-parser is Middleware plugin
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Set static path | # node render views 
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req, res) {
    res.send('Welcome Home'); // response is resulf return from server Node
});



// app.get('/hi',function(req,res) {
//     res.send('debugbarJS');
// });
app.listen(3333,function() {
    console.log('Server running ... on port 3333');
});