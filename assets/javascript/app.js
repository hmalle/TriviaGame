
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

  var correct;
  var incorrect;
  var unanswered;
  var index ;
  var timeLeft;
  var timerId;
  var timeoutId;

  function initializeVariables(){
    correct=0;
    incorrect=0;
    unanswered = 0;
    index = 0;
    timeLeft = 0;
    timerId = 0;
    timeoutId = 0;
  }

  function loadQuestion( question ){
    //gets a specific question, aka one element in the above array of questions
    $(".question").html(question.qn);
    $(".answers").empty();
    var choice1 =$("<div class='choices'>");
    var choice2 =$("<div class='choices'>");
    var choice3 =$("<div class='choices'>");
    var choice4 =$("<div class='choices'>");

    choice1.html(question.ans1);
    choice2.html(question.ans2);
    choice3.html(question.ans3);  
    choice4.html(question.ans4);
    $(".answers").append(choice1);
    $(".answers").append(choice2);
    $(".answers").append(choice3);
    $(".answers").append(choice4);
  }

  function displayAnswer(answerState){
    clearInterval(timerId);
    if(answerState==="correct"){
      $("answer").empty();
      $(".answer").append("<p>Good Job </p>");
      //$("#answer").append("<img src='"+question.url+"'>");
    }else if(answerState==="incorrect"){ 
      $(".answer").empty();
      $(".answer").append("<p>Wrong </p>");
      $(".answer").append("<p>The correct answer is "+q[index].ans+"</p>");
      //$("#answer").append("<img src='"+question.url+"'>");
    }else if(answerState==="timeout"){
      $(".answer").empty();
      $(".answer").append("<p>Time out </p>");
      $(".answer").append("<p>The correct answer is "+q[index].ans+"</p>");
      //$("#answer").append("<img src='"+question.url+"'>");
    }
    console.log(answerState);
    clearTimeout(timeoutId);
    if(index+1 === q.length){ 
      gameOver(); 
    }else{
      index++;
      questioning(index)
    }
  }

  function gameOver(){
    //a game over function. Displays the results 
    $(".question").empty();
    $(".answers").empty();
    $(".question").append("<h3>All Done, Here is how you did</h3>");
    $(".answers").append("<p>Correct answers "+correct+"</p>");
    $(".answers").append("<p>Incorrect answers "+incorrect+"</p>");
    $(".answers").append("<p>Unanswered "+ unanswered+"</p>");
    $(".answers").append("<button class='restart'>Restart</button>");
  }

  function startTimer(){
    timeLeft = 15; //30 seconds.
    $(".timer").html("The time remaining is: "+timeLeft+" seconds");
    timerId=setInterval(function timer(){
      timeLeft--;
      if(timeLeft <= 0){
        clearInterval(timerId);
        unanswered++;
        displayAnswer("timeout");
      }
      $(".timer").html("The time remaining is: "+timeLeft+" seconds");
    }, 1000);
  }

  function questioning(index){
    //TODO: Get rid of this function and call straight to loadQuestion
    loadQuestion( q[index]);
    startTimer();
  }

  $(".answers").append("<button class='start'>Start</button>"); //load the start button.
  $(".start").on("click",function(){
    $(".start").remove();
    initializeVariables();
    questioning(index);
  }); 

  $(".answers").on("click",".restart",function(){ 
    //NOT DRY AT ALL(copy and paste from the $(".start").
    $(".answers").empty();
    initializeVariables();
    questioning(index);
  });

  $(".answers").on("click",".choices",function(){
    //in case the user answered the question
    //get the click events and get the user choice text choice.
    var answer = $(this).text(); //wonderful
    console.log( answer );
    if( answer === q[index].ans){
      correct++;
      displayAnswer("correct");
    } else if( answer != q[index].ans){
      incorrect++;
      displayAnswer("incorrect");
    }
  });

}); 

