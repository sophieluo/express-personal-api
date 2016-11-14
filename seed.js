//This file allows us to seed our application with data
//simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var questions_list = [
  {
  name: "What did someone do that made you think they were really smart?",
  user: "Sophie Luo"
  },
  {
  name: "What are some mind-blowing facts that sound like 'BS', but are actually true?",
  user: "Justin Castilla"
  },
  {
  name: "What can I learn/know right now in 10 minutes that will be useful for the rest of my life?",
  user: "Jean Weatherwax"
  },
];

var users_list = [
  {
    name: "Sophie Luo"
  },
  {
    name: "Justin Castilla"
  },
  {
    name: "Jean Weatherwax"
  }
]

db.User.remove({}, function (err, users) {
  console.log('removed all test users');
  db.User.create(users_list, function(err, users) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('recreated all users');
    console.log('created', users.length, 'users');

    db.Question.remove({}, function (err, questions) {
      console.log('removed all test questions');
      questions_list.forEach(function (questionData) {
        var question = new db.Question({
          name: questionData.name
        });
          db.User.findOne({name: questionData.user}, function (err, foundUser) {
            if (err) {
            console.log(err);
            return;
          }
          question.user = foundUser;
          question.save(function(err, savedQuestion) {
            if(err) {
              return console.log(err);
            }
            console.log('saved' + savedQuestion.name);
          });
        });
      });
    })
  })
})

// db.Question.create(new_question, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }
//   console.log("Created question", question._id)
//   process.exit(); // we're all done! Exit the program.
// })
