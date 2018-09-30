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

// View engine
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));

// apply body-parser is Middleware plugin
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Set static path | # node render views 
app.use(express.static(path.join(__dirname, 'public')));

var people = [
    {
        gender: 'Man',
        jobs: 'Developer',
        age: 33
    },
    {
        gender: 'Strong',
        jobs: 'Developer PHP',
        age: 39
    },
    {
        gender: 'Woman',
        jobs: 'Developer JS',
        age: 31
    },
];
app.get('/',function(req, res) {
    //res.send('Welcome'); // response is resulf return from server Node
    var someText = "@lorem this good";
    res.render('index',{title: someText,users:people});
    
});

// add Peoples
app.post('/people/add',function(req,res) {
    var newPeople = {
        gender: req.body.gender,
        age: req.body.age,
        jobs: req.body.jobs
    };

    console.log('route: /people/add -> Form submitted');
    //console.log(req.body.gender);
    console.log(newPeople);
});




// app.get('/hi',function(req,res) {
//     res.send('debugbarJS');
// });
app.listen(3333,function() {
    console.log('Server running ... on port 3333');
});