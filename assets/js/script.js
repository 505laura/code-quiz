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

// Array to group the pages together
const pages = [startPage, questionPages, endPage, highscoresPage];

// Beginning at -1 so that the first page increments to 0
let page = -1;

// Function to change pages, beginning at the start page
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

// Function to have a timer counting down from 90 seconds to 0
let timeRemaining = 90;

function countdown() {
  const timeInterval = setInterval(function () {
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

const questions = [
  {
    question: "question 1?",
    options: ["yes", "no", "maybe", "sometimes"],
    answer: "yes",
  },
  {
    question: "question 2?",
    options: ["yes", "no", "maybe", "sometimes"],
    answer: "no",
  },
  {
    question: "question 3?",
    options: ["yes", "no", "maybe", "sometimes"],
    answer: "maybe",
  },
  {
    question: "question 4?",
    options: ["yes", "no", "maybe", "sometimes"],
    answer: "sometimes",
  },
  {
    question: "question 5?",
    options: ["yes", "no", "maybe", "sometimes"],
    answer: "yes",
  },
];

window.onload = pageChange;

startButton.addEventListener("click", pageChange);
startButton.addEventListener("click", countdown);