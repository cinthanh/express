var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');

var app = express();

// everything route after then.

// middleware Node
/*var logger = function(req, res, next) {
    console.log('Logging ...');
    next();
}

// apply middleware
app.use(logger); */

// View engine | using
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));

// apply body-parser is Middleware plugin
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Set static path | # node render views # demo
app.use(express.static(path.join(__dirname, 'public')));

//Global Vars When before form submit
app.use(function(req, res, next) {
    res.locals.errInfo = null;
    next();
});

// Express Validator Middlewave
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split()
            , root = namespace.shift()
            , formParam = root;
        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param   : formParam,
            msg     : msg,
            value   : value
        };    
    }
}));


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
    var someText = "@Home Pages";
    res.render('index',{title: someText,users:people});
    
});

// add Peoples
app.post('/people/add',function(req,res) {

    req.checkBody('gender','Gender is required').notEmpty();
    req.checkBody('age','Age is required').notEmpty();
    req.checkBody('jobs','Jobs is required').notEmpty();
    var errFormPeople = req.validationErrors();

    if (errFormPeople) {
        console.log('route: /people/add -> Form ERROR');
        //console.log(errFormPeople); // debug errors

        res.render('index',{
            title:"@::errForm"
            ,users: people
            ,errInfo: errFormPeople
        });
    } else {
        var newPeople = {
            gender: req.body.gender,
            age: req.body.age,
            jobs: req.body.jobs
        };   
        console.log('route: /people/add -> Form SUCCESS');   
    }
    //console.log(req.body.gender);
});




// app.get('/hi',function(req,res) {
//     res.send('debugbarJS');
// });
app.listen(3333,function() {
    console.log('Server running ... on port 3333');
});