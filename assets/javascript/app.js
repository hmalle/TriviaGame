
$(document).ready(function(){

var q=[
  { qn: "In the year 1900, What were the most popular boy and girl first names?",
    ans :"John and Mary",
    ans1:"William and Elizabeth",
    ans2:"Joseph and Catherine",
    ans3:"John and Mary",
    ans4:"George and Anne" },
  { qn: "Which Apollo mission landed the first human on the Moon?",
    ans :"Apollo 11",
    ans1:"Apollo 7",
    ans2:"Apollo 9",
    ans3:"Apollo 11",
    ans4:"Apollo 13"},
  { qn: "Who starred in the 1959 epic fil m 'Ben-Hur'?",
    ans : "Errol Flynn",
    ans1: "Charles Heston",
    ans2: "Clack Gable",
    ans3: "Errol Flynn",
    ans4: "Lee Marvin"}, 
  { qn: "The reactor at the site of the Chernobyl nuclear disaster now is in which country?",
    ans: "Ukraine",
    ans1: "Ukraine",
    ans2: "Slovakia",
    ans3: "Hungary",
    ans4: "Russia"}
  ]

  var correct=0;
  var incorrect=0;
  var unanswered=0;
  var nextQuestion;
  var index = 0; //quesition index.
  var timeLeft = 30;
  var timerid;
  var timeout;

  function loadQuestion( question ){
    //gets a specific question, aka one element in the above array of questions
    $(".question").html(question.qn);
    $(".ans1").html(question.ans1);
    $(".ans2").html(question.ans2);
    $(".ans3").html(question.ans3);  
    $(".ans4").html(question.ans4);
  }

  function correctAnswer(question){
    $("answer").empty();
    $(".answer").append("<p>Good Job </p>");
    //$("#answer").append("<img src='"+question.url+"'>");
    var timeout = setTimeout(clearTimeout(timeout), 1000);
  }

  function wrongAnswer(question){
    //a function that fires between questions.
    $(".answer").empty();
    $(".answer").append("<p>The correct answer is "+question.ans+"</p>");
    //$(".answer").append("<img src='"+question.url+"'>");
    var timeout = setTimeout(clearTimeout(timeout) ,1000);
  }

  function gameOver(){
    //a game over function. Displays the results 
    $(".question").text("All Done, Here is how you did");
    $(".ans1").text("Correct answers "+correct);
    $(".ans2").text("Incorrect answers "+incorrect);
    $(".ans3").text("Unanswered "+ unanswered);
    $(".ans4").html("<button class='.restart'>Restart</button>");
  }

  function initializeVariables(){
    correct=0;
    incorrect=0;
    unanswered = 0;
    nextQuestion = true;
    index = 0;
    timeout = false;
    //timeLeft = 30; //initialized in the startTimer
    //except the interval;
  }

  function startTimer(){
    timeLeft = 30; //30 seconds.
    $(".timer").html("The time remaining is: "+timeLeft+" seconds");
    timerid=setInterval(function timer(){
      timeLeft--;
      if(timeLeft <= 0){
        clearInterval(timerid);
        unanswered++;
      }
      $(".timer").html("The time remaining is: "+timeLeft+" seconds");
    }, 1000);
  }

  function questioning(index){
    loadQuestion( q[index]);
    startTimer();
  }

  $(".answers").append("<button class='start'>Start</button>"); //load the start button.
  $(".start").on("click",function(){
    $(".start").remove();
    initializeVariables();
    questioning(index);
    console.log("in the start");
  }); 

  $(".answers").on("click",".choices",function(){
    //in case the user answered the question
    //get the click events and get the user choice text choice.
    var answer = $(this).text(); //wonderful
    console.log( answer );
    clearInterval(timerid); //stop the timer once an answer has been entered
    if( answer === q[index].ans){
      correct++;
      correctAnswer(q[index]);
    }
    if( answer != q[index].ans){
      incorrect++;
      wrongAnswer(q[index]);
    }
    if(index<q.length-1){ questioning(index++); }
  });
  //now I have to check for timeouts and end of questions
  if(timeout){
    unanswered++;
    clearInterval(timeid);
    if(index< q.length -1){ questioning(index++); }
  }
  if(index+1 >= q.length){ gameOver(); }
}); 

