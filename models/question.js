var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  User = require('./user');

var AnswerSchema = new Schema ({
  name: String
});

var QuestionSchema = new Schema({
    name: String,
    user: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    answers: [AnswerSchema]
  });

var Question = mongoose.model('Question', QuestionSchema);
module.exports = Question;
