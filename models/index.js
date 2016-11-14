var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/personal-api");

module.exports.Question = require("./question.js");
module.exports.User = require("./user.js");
