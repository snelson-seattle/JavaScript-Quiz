
// UI Elements
let startBtn = document.querySelector("#start-btn");
let scoresBtn = document.querySelector("#scores-btn");
let saveBtn = document.querySelector("#save-btn");
let clearBtn = document.querySelector(".clear-btn");
let homeBtn = document.querySelector("#home-btn");
let highScorebtn = document.querySelector("#high-score-btn");
let landingBox = document.querySelector("#landing-form");
let quizBox = document.querySelector("#quiz-container");
let scoreBox = document.querySelector("#save-score-container");
let highScoreBox = document.querySelector("#high-score-container");
let timerEl = document.querySelector("#timer-lbl");
let scoreEl = document.querySelector("#score-lbl");
let scoreboardEl = document.querySelector(".score-hdr");
let listEl = document.querySelector("#scores-list");
let questionEl = document.querySelector("#question");
let answerA = document.querySelector(".a-btn");
let answerB = document.querySelector(".b-btn");
let answerC = document.querySelector(".c-btn");
let answerD = document.querySelector(".d-btn");


// State Variables
let timeLeft = 0;
let playerScore = 0;
let qNumber = 0;
let highScores;
if(localStorage.getItem("HighScores") === null){
    highScores = [];
}else{
    highScores = JSON.parse(localStorage.getItem("HighScores"));
}
let highScore = "";

// Quiz Questions
let questions = [
  {
      question: "You can declare a variable in JavaScript using the keyword ______.",
      answers: {
          a: "let",
          b: "var",
          c: "const", 
          d: "all of the above"
      },
      correctAnswer: "d"

  },
  {
      question: "What built in JavaScript function will convert a string to an integer?",
      answers: {
          a: "parseInt()",
          b: "findInt()",
          c: "getInt()",
          d: "none of the above"
      },
      correctAnswer: "a"
  },
  {
      question: "Given the statements: var x = 3; if(x === 3) {x += 5;}  What is the current value of x?",
      answers: {
          a: "5",
          b: "3",
          c: "8",
          d: "none of the above"
      },
      correctAnswer: "c"
  },
  {
      question: "Inside of which HTML element is JavaScript inserted?",
      answers: {
          a: "<js>",
          b: "<script>",
          c: "<javascript>",
          d: "none of the above"
      },
      correctAnswer: "b"
  },
  {
      question: "What is the correct JavaScript to change the text 'This is a demo' in the following element: " +
                "<p id='demo'>This is a demo.</p>",
      answers: {
          a: "document.getElementByName('p').innerHTML = 'Hello World'",
          b: "#demo.innerHTML = 'Hello World'",
          c: "document.getElementById('demo').innerHTML = 'Hello World'",
          d: "none of the above"
      },
      correctAnswer: "c"
    
  },
  {
      question: "Best practice dictates that you should insert javascript in the _________",
      answers: {
          a: "bottom of the <head>",
          b: "top of the <body>",
          c: "bottom of the <body>",
          d: "all of the above"
      },
      correctAnswer: "c"
  },
  {
      question: "What is the proper way of referencing an external JavaScript file named app.js?",
      answers: {
          a: "<script src='app.js'",
          b: "<script href='app.js'",
          c: "<script name='app.js'",
          d: "none of the above"
      },
      correctAnswer: "a"
  },
  {
      question: "How do you write 'Error' in an alert box?",
      answers: {
          a: "msg('Error');",
          b: "error('Error');",
          c: "alert('Error');",
          d: "none of the above"
      },
      correctAnswer: "c"
  },
  {
      question: "How do you define a function named myFunction in JavaScript?",
      answers: {
          a: "function myFunction()",
          b: "myFunction = function()",
          c: "function = myFunction()",
          d: "none of the above"
      },
      correctAnswer: "a"
  },
  {
      question: "What is the proper syntax for a while loop?",
      answers: {
          a: "while(condition === true){}",
          b: "{}while(condition === true)",
          c: "while{}(condition === true)",
          d: "none of the above"
      },
      correctAnswer: "a"
  }




]



// Button Click Event Listeners

homeBtn.addEventListener("click", showLanding);
highScorebtn.addEventListener("click", scoreHandler);

answerA.addEventListener("click", function(){
    let choice = answerA.getAttribute("data-choice");
    checkAnswer(choice);
});

answerB.addEventListener("click", function(){
    let choice = answerB.getAttribute("data-choice");
    checkAnswer(choice);
});

answerC.addEventListener("click", function(){
    let choice = answerC.getAttribute("data-choice");
    checkAnswer(choice);
});

answerD.addEventListener("click", function(){
    let choice = answerD.getAttribute("data-choice");
    checkAnswer(choice);
});


startBtn.addEventListener("click", function(){  
  landingBox.classList.add("modal");  
  quizBox.classList.remove("modal");
  qNumber = 0;
  playerScore = 0;
  scoreEl.textContent = playerScore;
  beginTimer();
  showQuiz();  
});

saveBtn.addEventListener("click", function(){
    let playerInitials = prompt("Enter initials").toUpperCase();  
    highScore = playerInitials + " ---------------------------------------- " + playerScore + " pts"; 
    highScores.push(highScore);
    localStorage.setItem("HighScores", JSON.stringify(highScores));
    scoreBox.classList.add("modal");
    landingBox.classList.remove("modal");

});


clearBtn.addEventListener("click", function(){
    localStorage.clear();
    if(listEl.children.length > 0){
        for(let i = listEl.children.length - 1; i >= 0 ; i--){
            listEl.removeChild(listEl.children[i]);
        }
    }
});

scoresBtn.addEventListener("click", scoreHandler);


// Pre-defined Event Handler Functions

function scoreHandler (){   
    landingBox.classList.add("modal");
    highScoreBox.classList.remove("modal"); 
    scoreListInit();

    for(let i = 0; i < highScores.length; i++){
        let li = document.createElement("li");
        li.innerHTML = highScores[i];
        listEl.appendChild(li);
    }
      
    
}

function showLanding(){
    landingBox.classList.remove("modal");
    highScoreBox.classList.add("modal");
    quizBox.classList.add("modal");
    scoreBox.classList.add("modal");
}





// Application Functions

function showQuiz(){      
        questionEl.textContent = questions[qNumber].question;
        answerA.textContent = "A.  " + questions[qNumber].answers.a;
        answerB.textContent = "B.  " + questions[qNumber].answers.b;
        answerC.textContent = "C.  " + questions[qNumber].answers.c;
        answerD.textContent = "D.  " + questions[qNumber].answers.d;    
}


function enterScores(){ 
    quizBox.classList.add("modal");
    scoreBox.classList.remove("modal");
    scoreboardEl.textContent = playerScore;
}

function beginTimer () {
    timeLeft = 120;
    let timeInterval = setInterval(function() {
        timerEl.textContent = timeLeft;
        timeLeft--;
    
        if (timeLeft === 0) {
          timerEl.textContent = "-";
          clearInterval(timeInterval);
        }
    
      }, 1000);    
}

function checkAnswer(choice){
    if(choice === questions[qNumber].correctAnswer){
        playerScore += 5;
    }else {
        playerScore -= 2;
        timeLeft -= 5;
    }

    scoreEl.textContent = playerScore;
    qNumber++;

    if(qNumber < questions.length && timeLeft != 0){
        showQuiz();
    }else{
        enterScores();
    }
    
}


function scoreListInit(){
    if(listEl.children.length > 0){
        for(let i = listEl.children.length - 1; i >= 0 ; i--){
            listEl.removeChild(listEl.children[i]);
        }
    }   
}
