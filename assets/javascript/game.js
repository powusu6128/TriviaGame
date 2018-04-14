// Data

//_____________________________________________________________________________________

// The questions object contains questions.

// Each question object has a question, array of answers, correct answer, and video ID.

var questions = {

  q1: {

    question: "Who is the president of america in the year 2018?",



    answers: ["Donald Trump", "Barack Obama", "Bill Clinton", "Philip Owusu"],



    correctAnswer: "Donald Trump",



    myImage: "assets/images/trump.jpg"



  },



  q2: {

    question: "Who is the fastest man on earth?",



    answers: ["Carl Lewis", "Usain Bolt", "Tiger Wood", "Justin Gatlin"],



    correctAnswer: "Usain Bolt",



    myImage: "assets/images/bolt.jpg"

  },



  q3: {

    question: "How rich is  Mark Zuckerberg?",



    answers: ["61 billion", "71 billion", "81 billion", "91 billion"],



    correctAnswer: "71 billion",



    myImage: "assets/images/mark.jpg"

  },



  q4: {



    question: "Who invented computer?",



    answers: ["Bill Gate", "Charles Babbage", "Blaise Pascal ", "Howard Hathaway Aiken"],



    correctAnswer: "Charles Babbage",



    myImage: "assets/images/charles.jpg"



  },



  q5: {



    question: "What is the first invented programming language ?",



    answers: ["ada", "fortran", "java", "javascript"],



    correctAnswer: "fortran",



    myImage: "assets/images/fortran.jpg"



  },

  q6: {



    question: "Who is the richest woman in the world right now?",



    answers: ["Maria Franca Fissolo", "Jacqueline Mars", "Yang Huiyan", "Alice Walton"],



    correctAnswer: "Alice Walton",



    myImage: "assets/images/alice.jpg"

  }

  ,

  q7: {

    question: "Founded in 1921, which company is credited with being the first 'fast food' chain?",



    answers: ["wendy's", "White Castle", "Menas", "beggar king"],



    correctAnswer: "White Castle",



    myImage: "assets/images/white-castle.png"

  },



  q8: {

    question: "Who was president of the United States when bombs were dropped on Hiroshima and Nagasaki?",



    answers: ["Jimmy Carter", "Harry S. Truman", "Gerald Ford", "Lyndon B Johnson"],



    correctAnswer: "Harry S. Truman",



    myImage: "assets/images/harry.jpg"

  },



  q9: {

    question: "What is the closest star to our own sun?",



    answers: ["Helio", "Proxima Centauri", "Suturn", "Alpha Centauri"],



    correctAnswer: "Proxima Centauri",



    myImage: "assets/images/proxima.jpg"

  }

};


// Creates array of questions for questions object.

var questionsArray = [questions.q1, questions.q2, questions.q3, questions.q4,
   questions.q5, questions.q6, questions.q7, questions.q8, questions.q9];



// Control which page is displayed.

const startPage = $("#start-page");

const questionPage = $("#question-page");

const answerPage = $("#answer-page");

const resultsPage = $("#results-page");



// More global variables.

//____________________________________________________________________________________

var questionID;

var index = 0;

var correctAnswers = 0;

var incorrectAnswers = 0;

var unanswered = 0;

var section = "";

var timeNumber = 5

var timeIntervalID;



// Event listeners.

//____________________________________________________________________________________



// Fires when start button clicked.

function addStartClickListener() {

  $("#start").on("click", function () {

    console.log("Start button clicked");



    // Reset index so first question on start.

    index = 0;

    questionID = questionsArray[index];



    // Shows question page.

    showSection(questionPage);



    // Displays question and possible answers.

    displayQuestion();



    // Start question countdown.

    startTimer();



    // Reset correct answer counter.

    correctAnswers = 0;



    // Reset incorrect answers counter.

    incorrectAnswers = 0;



    // Reset unanswered counter.

    unanswered = 0;



  });

};



// Fires when answer list item selected.

function addAnswerClickListener() {

  $("li").on("click", function () {



    // Set selected answer to selected list item.

    selectedAnswer = $(this).html();



    // Show answer page.

    showSection(answerPage);



    // Add answer information to answer page.

    createAnswerSection(selectedAnswer);

  });

};



// When fired, returns to start page.

function addRestartClickListener() {

  $("#restart").on("click", function () {

    showSection(startPage);

  });

};



// Functions

//_____________________________________________________________________________________



// Displays only one active page.

function showSection(section) {

  startPage.css({
    'display': 'none'
  });

  questionPage.css({
    'display': 'none'
  });

  answerPage.css({
    'display': 'none'
  });

  resultsPage.css({
    'display': 'none'
  });



  if (section) {

    section.css({
      'display': 'block'
    });

  }

};



// Displays question and list of possible answers in DOM.

function displayQuestion() {

  $("#question").html(questionID.question);



  // Displays question's possible answers.

  displayQuestionAnswers();

};



// Starts timer on question page.

function startTimer() {

  timeIntervalID = setInterval(decrement, 1000);

};



// Decrements time on question page.

function decrement() {

  timeNumber--;



  //  Show time in time span.

  $(".time").html(timeNumber);



  // If time runs out, set question to unanswered.

  if (timeNumber === 0) {

    setQuestionUnanswered();

  }

};



// Set question unanswered.

function setQuestionUnanswered() {

  showSection(answerPage);

  selectedAnswer = false;

  createAnswerSection(selectedAnswer);

};



// Stops timer.

function stopTimer() {

  clearInterval(timeIntervalID);

};



// Displays possible answers to question.

function displayQuestionAnswers() {



  // Empties out existing answers from previous question.

  $(".answer-choices").empty();



  // Creates new list of answers for question.

  for (var i = 0; i < questionID.answers.length; i++) {



    // Create answer option list item.

    var answerOption = $("<li>");



    // List item selectable.

    answerOption.addClass("ui-widget-content");



    // Set answer option text to answer in questions array.

    answerOption.html(questionID.answers[i]);



    // Append answer option to the list of answer choices.

    answerOption.appendTo(".answer-choices");

  }



  $("li").hover(function () {

      $(this).addClass("hover");

    }, function () {

      $(this).removeClass("hover");

    }

  );

  // Listens for answer click event.

  addAnswerClickListener();

};



// Displays content in answer section.

function createAnswerSection(selectedAnswer) {



  // Stops timer.

  stopTimer();



  // Get correct answer for question.

  var correctAnswer = questionID.correctAnswer;



  // Display correct answer information.

  $("#correct-answer-info").html("The correct Answer was: " + correctAnswer);



  // If selected answer correct...

  if (correctAnswer === selectedAnswer) {



    // Empty out preview question's correct answer information.

    $("#correct-answer-info").empty();



    // Update correct answers count.

    correctAnswers++;

    $("#answer-assessment").html("Correct!");



    // Else if no answer selected.

  } else if (selectedAnswer === false) {



    // Update unanswered answers count.

    unanswered++;

    $("#answer-assessment").html("Out of Time!");



    // Else selected answer incorrect.

  } else {

    // Update incorrect answers count.

    incorrectAnswers++;

    $("#answer-assessment").html("Nope!");

  }



  // Display question's video.

  displayVideo();



  // Length of time answer page appears.

  setTimeout(answerTimeOut, 5000);

};



// Called when answer page times out.

function answerTimeOut() {



  // If there's another question, display it.

  if (index < questionsArray.length - 1) {

    index++;

    questionID = questionsArray[index];

    goToNextQuestion();



    // If there's no more questions, show results.

  } else {

    showTriviaResults();

  }

}



// Display correct, incorrect, and unanswered question counts.

function showTriviaResults() {

  showSection(resultsPage);

  $("#correct-answers").html(correctAnswers);

  $("#incorrect-answers").html(incorrectAnswers);

  $("#unanswered").html(unanswered);

}



// Display video for correct answer.

function displayVideo() {

  var myImage = questionID.myImage;

  $("#answer-media").attr("src", myImage);

};



// Go to next question.

function goToNextQuestion() {



  // Display question page.

  showSection(questionPage);



  // Empties out existing answers from previous question.

  $(".answer-choices").empty();



  // Displays question and possible answers.

  displayQuestion();



  // Resets question timer.

  resetTimer();



}



// Resets question timer.

function resetTimer() {



  // Timer interval countdowns from 5 seconds.

  timeNumber = 5;



  // Starts timer with time number reset.

  startTimer();

}



$(document).ready(function () {



  // Displays start page.

  showSection(startPage);



  // Listens for stark click event.

  addStartClickListener();



  // Listens for restart click event

  addRestartClickListener();



});