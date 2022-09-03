// Constant to store the button element on the start page
const startButton = document.querySelector('#start-button');

// Constants to store the elements from the HTML
const startPage = document.querySelector('#start-page');
const questionPages = document.querySelector('#question-pages');
const endPage = document.querySelector('#end-page');
const highscoresPage = document.querySelector('#highscores-page');

// Array to group the pages together
const pages = [startPage, questionPages, endPage, highscoresPage];

// Beginning at -1 so that the first page increments to 0
let page = -1;

// Function to change pages, beginning at the start page
function pageChange() {
    // Iterating through the pages array to hide all of the content
    for (let i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
    }
    page++;
    switch (page) {
      case 0:
        startPage.style.display = '';
        break;
      case 1:
        questionPages.style.display = '';
        break;
      case 2:
        endPage.style.display = '';
        break;
      case 3:
        highscoresPage.style.display = '';
        break;
      default:
        startPage.style.display = '';
        break;
    }
}

window.onload = pageChange;

startButton.addEventListener('click', pageChange);