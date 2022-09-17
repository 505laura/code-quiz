// Constant to store the button element from the start page
const startButton = document.querySelector("#start-button");

// Constants to store elements from the HTML document
const startPage = document.querySelector("#start-page");
const questionPages = document.querySelector("#question-pages");
const endPage = document.querySelector("#end-page");
const highscoresPage = document.querySelector("#highscores-page");
const timerCount = document.querySelector("#timer-count");
const timerText = document.querySelector("#timer-text");
const questionAsked = document.querySelector("#question-pages h2");
const answers = document.querySelectorAll("#question-pages button");
const score = document.querySelector("#score");
const initials = document.querySelector("#initial-input");
const submit = document.querySelector("#submit-button");
const clearButton = document.querySelector("#clear-scores");
const startOverButton = document.querySelector("#start-over");
const goToHighscoresLink = document.querySelector("#highscores-link");

// Array to group the pages together
const pages = [startPage, questionPages, endPage, highscoresPage];
let highscores = [];

// Beginning at -1 so that the first page increments to 0
let page = -1;

// Change pages, beginning at the start page
function pageChange() {
  // Iterating through the pages array to hide all of the content
  for (let i = 0; i < pages.length; i++) {
    pages[i].style.display = "none";
  }
  page++;
  switch (page) {
    case 0:
      startPage.style.display = "";
      break;
    case 1:
      questionPages.style.display = "";
      break;
    case 2:
      endPage.style.display = "";
      break;
    case 3:
      highscoresPage.style.display = "";
      break;
    default:
      startPage.style.display = "";
      break;
  }
}

// Add a timer counting down from 90 seconds to 0
let timeRemaining = 90;

let timeInterval = -1;

function countdown() {
  timeInterval = setInterval(function () {
    timeRemaining--;
    timerCount.textContent = timeRemaining;
    if (timeRemaining > 1) {
    } else if (timeRemaining === 1) {
      timerText.textContent = " second remaining";
    } else {
      timerText.textContent = " seconds remaining";
      clearInterval(timeInterval);
    }
  }, 1000);
}

let questionNumber = 0;

const rounds = 5;

const questions = [
  {
    question: "In which HTML element do we put the JavaScript code?",
    options: ["<javascript>...</javascript>", "<js>...</js>", "<script>...</script>", "<css>...</css>"],
    answer: "<script>...</script>",
  },
  {
    question: "Which symbol is used to separate JavaScript statements?",
    options: ["Comma (,)", "Colon (:)", "Hyphen (_)", "Semicolon (;)"],
    answer: "Semicolon (;)",
  },
  {
    question: "Which JavaScript method is used to access an HTML element by id?",
    options: ["document.getElementById()", "document.getElement(id)", "document.getElementById(id)", "document.elementById(id)"],
    answer: "document.getElementById(id)",
  },
  {
    question: "Which JavaScript method is used to write on browser's console?",
    options: ["console.write()", "console.output()", "console.log()", "console.writeHTML()"],
    answer: "console.log()",
  },
  {
    question: "In JavaScript, single line comment begins with ___.",
    options: ["#", "/*", "$", "//"],
    answer: "//",
  },
  {
    question: "The const keyword is used to define a ______.",
    options: ["Function scoped variable", "Block scoped variable", "Constant", "Constant with no initial value"],
    answer: "Constant",
  },
  {
    question: "What is the default value of an uninitialized variable?",
    options: ["0", "undefined", "null", "NaN"],
    answer: "undefined",
  },
  {
    question: "Which is the correct syntax to declare a constant in JavaScript?",
    options: ["const constant_name", "constant_name const;", "constant_name const = value;", "const constant_name = value;"],
    answer: "const constant_name = value;",
  },
  {
    question: "Which is the exponentiation operator in JavaScript?",
    options: ["exp()", "^", "**", "pow"],
    answer: "**",
  },
  {
    question: "JavaScript arrays are written with _____.",
    options: ["()", "{}", "[]", "<>"],
    answer: "[]",
  },
  {
    question: "JavaScript objects are written with _____.",
    options: ["()", "{}", "[]", "<>"],
    answer: "{}",
  },
  {
    question: "Which keyword is used to define a JavaScript function?",
    options: ["function", "fun", "method", "method()"],
    answer: "function",
  },
  {
    question: "Which is the correct syntax to write an IF statement in JavaScript?",
    options: ["if i = 5", "if (i == 5)", "if i = 5 then", "if i == 5"],
    answer: "if (i == 5)",
  },
  {
    question: "Which is the correct syntax to access an object property in JavaScript?",
    options: ["objectName:propertyName", "objectName.propertyName", "objectName['propertyName']", "Both B and C"],
    answer: "Both B and C",
  },
  {
    question: "Which property is used to get the length of a string in JavaScript?",
    options: [".len", ".strlen", ".length", ".Length"],
    answer: ".length",
  },
  {
    question: "The internal clock in JavaScript counts from midnight _____.",
    options: ["January 1, 1972", "January 1, 1947", "January 1, 1980", "January 1, 1970"],
    answer: "January 1, 1970",
  }
];

// Randomize the questions
questions.sort(function() { return Math.random() - 0.5;});
// Randomize the options for each question 
questions.forEach(function(question) { question.options.sort(function() { return Math.random() - 0.5;}); });

// Input question at the top of the page and each of the answers in the button elements
function setupQuestion() {
  const currentQuestion = questions[questionNumber];
  questionAsked.innerHTML = currentQuestion.question;

  for (let i = 0; i < 4; i++) {
    answers[i].innerHTML = currentQuestion.options[i];
    // Reset the colors of correct/incorrect answers
    answers[i].classList.remove("correct", "incorrect");
  }
}

// Update questions and answers 0.8 seconds after the user selects an answer
function nextQuestion() {
  questionNumber++;
  if (questionNumber > rounds) {
    return endQuiz();
  }
  setTimeout(setupQuestion, 800);
}

function endQuiz() {
  setTimeout(pageChange, 800);
  clearInterval(timeInterval);
  score.textContent = timeRemaining;
}

// Make correct answers green and incorrect answers red 
function answerResult(event) {
  const answerSelected = event.target.innerHTML;
  const currentQuestion = questions[questionNumber];
  if (answerSelected === currentQuestion.answer) {
    event.target.classList.add("correct");
  } else {
    timeRemaining -= 10;
    timerCount.textContent = timeRemaining;
    event.target.classList.add("incorrect");
  }
}

function submitHighscore(event) {
  event.preventDefault();
  const initialsInput = initials.value;
  const scoreInput = timeRemaining;
  const newHighscore = {
    initials: initialsInput,
    score: scoreInput
  }
  highscores.push(newHighscore);
  saveHighscores();
  showHighscores();
  pageChange();
}

function startUp() {
  pageChange();
  loadHighscores();
}

function showHighscores() {
  // Sort highscores in descending order
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });
  
  // Clear the highscores page
  highscoresPage.children[1].innerHTML = "";

  // Only show top 5 highscores
  const highscoresToShow = highscores.slice(0, 5);

  // Add each highscore as a new <li> element
  highscoresToShow.forEach(function (highscore) {
    const li = document.createElement('li');
    li.innerHTML = `${highscore.initials} - ${highscore.score}`;
    highscoresPage.children[1].appendChild(li);
  });
}

function loadHighscores() {
  let savedHighscores = localStorage.getItem("highscores");
  if (savedHighscores == undefined) {
    savedHighscores = [];
  }
  highscores = JSON.parse(savedHighscores);
}

function saveHighscores() {
  localStorage.setItem("highscores", JSON.stringify(highscores));
}

function clearHighscores() {
  highscores = [];
  saveHighscores();
  showHighscores();
}

function startOver() {
  page = -1;
  pageChange();
  questionNumber = 0;
  timeRemaining = 90;
  timerCount.textContent = timeRemaining;
}

function goToHighscores() {
  page = 2;
  pageChange();
}

window.onload = startUp;

startButton.addEventListener("click", pageChange);
startButton.addEventListener("click", countdown);

for (let i = 0; i < 4; i++) {
  answers[i].addEventListener("click", answerResult);
  answers[i].addEventListener("click", nextQuestion);
}

startButton.addEventListener("click", setupQuestion);
submit.addEventListener("click", submitHighscore);
clearButton.addEventListener("click", clearHighscores);
startOverButton.addEventListener("click", startOver);
goToHighscoresLink.addEventListener("click", goToHighscores);