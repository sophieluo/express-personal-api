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



});
