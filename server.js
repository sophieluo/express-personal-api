// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

// connect to db models
 var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    woopsIForgotToDocumentAllMyEndpoints: false,
    message: "Welcome to Sophie's personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/sophieluo/express-personal-api/blob/master/README.md",
    baseUrl: "http://shielded-peak-37764.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/questions", description: "Questions posted on my site"},
      {method: "GET", path: "/api/users", description: "Users using my site to answer questions"},
      {method: "GET", path: "/api/answers", description: "Answers to questions"}, //this should be embedded in answers
    ]
  })
});

//get all questions
app.get('/api/questions', function (req, res) {
  console.log("hello")
  // send all questions as JSON response
  // db.Question.find().populate('user')
  //   .exec(function(err, questions) {
  //     if (err) { return console.log("index error: " + err); }
  //     res.json(questions);
  // });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
