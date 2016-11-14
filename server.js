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
      {method: "GET", path: "/api/profile", description: "Profile of creator"},
      {method: "GET", path: "/api/questions", description: "Questions posted on my site"},
      {method: "GET", path: "/api/questions/:id", description: "Look up one particular question by question id"},
      {method: "GET", path: "/api/users", description: "All user profiles"},
      {method: "POST", path: "/api/questions", description: "Ask new questions"},
      {method: "POST", path: "api/questions/:question_id/answers", description: "Post new answers to questions"}
    ]
  })
});

//get profile
app.get('/api/profile',  function (req, res) {
  res.json({
    name: 'Sophie Luo',
    githubLink: 'https://github.com/sophieluo',
    githubProfileImage: 'https://github.com/settings/profile',
    personalSiteLink: 'https://sophieluo.github.io',
    currentCity: 'San Francisco',
    pets: 'none'
  })
});

//get all questions
app.get('/api/questions', function (req, res) {
  // send all questions as JSON response
  db.Question.find().populate('user')
     .exec(function(err, questions) {
      if (err) { return console.log("index error: " + err); }
      res.json(questions);
  });
});

//get one question by it's id
app.get('/api/questions/:id', function (req, res) {
  var questionId = req.params.id;
  db.Question.findOne({_id: questionId}, function(err, data) {
    res.json(data);
  });
});

//get all users
app.get('/api/users', function (req, res) {
  // send all questions as JSON response
  db.User.find().populate('question')
     .exec(function(err, users) {
      if (err) { return console.log("index error: " + err); }
      res.json(users);
  });
})

//create a question
app.post('/api/questions', function (req, res) {

  var newQuestion = new db.Question({
    name: req.body.name,
    user: req.body.user,
  });

  db.User.findOne({name: req.body.user}, function (err, foundUser) {
    if (err) {
      return console.log(err);
    }
    newQuestion.user = foundUser;
    newQuestion.save(function (err, question) {
      res.json(question);
      console.log(question)
    });

  });
});

// create an answer embedded in a question
app.post('/api/questions/:question_id/answers', function (req, res) {
  // Get book id from url params (`req.params`)
  var questionId = req.params.question_id;
  db.Question.findById(questionId)
    .populate('user')
    .exec(function(err, foundQuestion) {
      console.log(foundQuestion);
      if (err) {
        res.send(err);
      } else if (foundQuestion === null) {
        // Is this the same as checking if the foundBook is undefined?
        res.send("No Question found by this ID");
      } else {
        // push character into characters array
        var postAnswer = foundQuestion.answers
        postAnswer.push(req.body);
        // save the book with the new character
        foundQuestion.save();
        res.json(foundQuestion);
      }
    });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
