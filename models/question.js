var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var QuestionSchema = new Schema({
    name: String,
    user: String
  });

var Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
