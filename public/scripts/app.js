console.log("Sanity Check: JS is working!");
var template;
var $questionsList;
var allQuestions = [];

$(document).ready(function(){

$questionsList = $('#questionTarget');

  // compile handlebars template
var source = $('#questions-template').html();
template = Handlebars.compile(source);

  $.ajax({
  method: 'GET',
  url: '/api/questions',
  success: handleSuccess,
  error: handleError
});


  $('#newQuestionForm').on('submit', function(e) {
    e.preventDefault();
    console.log('new question serialized', $(this).serializeArray());
    $.ajax({
      method: 'POST',
      url: '/api/questions',
      data: $(this).serializeArray(),
      success: newQuestionSuccess,
      error: newQuestionError
    });
  });

  $questionsList.on('submit', '#addAnwserForm', function(e) {
    e.preventDefault();
    //console.log('new anwsers', $(this).serializeArray());
    $.ajax({
      method: 'POST',
      url: '/api/questions/'+$(this).attr('data-id')+'/answers',
      data: $(this).serializeArray(),
      success: newAnswerSuccess,
      error: newAnswerError
    });
  });


  function render () {
    // empty existing posts from view
    $questionsList.empty();

    // pass `allBooks` into the template function
    var questionsHtml = template({ questions: allQuestions });

    // append html to the view
    $questionsList.append(questionsHtml);
  }



  function handleSuccess(json) {
    allQuestions = json;
    render();
  }

  function handleError(e) {
    console.log('uh oh');
    $('#questionTarget').text('Failed to load, is the server working?');
  }



  function newQuestionSuccess(json) {
    $('#newQuestionForm').val('');
    allQuestions.push(json);
    render();
  }

  function newQuestionError() {
    console.log('newquestion error!');
  }

  function newAnswerSuccess(json) {
    var question = json;
    console.log(json)
    var questionId = question._id;
    // find the book with the correct ID and update it
    for(var i = 0; i < allQuestions.length; i++) {
      if(allQuestions[i]._id == questionId) {
        allQuestions[i] = question;
        break;  // we found our book - no reason to keep searching (this is why we didn't use forEach)
      }
      //console.log(question)
    }
    render();
  }

  function newAnswerError() {
    console.log('adding new answer error!');
  }

});
