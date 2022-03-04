// constants
const mainEl = document.querySelector("main");
const msgBoxEl = document.querySelector(".message-box");
const msgEl = document.querySelector(".message-box > h3");
const playAgainEl = document.querySelector(".message-box > button")
const hintEl = document.querySelector(".title > h3");
const boxesEl = document.querySelector(".boxes");
const boxesLettersEl = document.querySelector(".boxes-letters");
const wordEl = document.querySelector(".word");
const alphaEl = document.querySelector(".alphabet");
const letterEl = document.querySelector(".letter");
const livesEl = document.querySelector(".lives");
const lifeEl = document.querySelector(".life");

const maxGuesses = 6;
document.getElementById('restart-button').addEventListener('click', init);

const wordBank = [
    {word: "BENDER",
    hint: "WHO IS THE CHEIF OF PLANET EXPRESS"},

    {word: "LEELA",
    hint: "WHO IS THE CAPTAIN OF THE PLANET EXPRESS SHIP"},
    
    {word: "PURPLE",
    hint: "WHAT IS THE COLOUR OF LEELA'S HAIR?"},
    
    {word: "SLURM",
    hint: "WHAT IS THE NAME OF FRY'S FAVOURITE DRINK?"},
    
    {word: "MARS",
    hint: "WHAT PLANET DOES AMY'S PARENTS LIVE ON?"},
    
    {word: "NIBBLER",
    hint: "WHAT IS THE NAME OF LEELA'S PET?"},

    {word: "ZOIDBERG",
    hint: "WHAT IS THE NAME OF THE DOCTOR WORKING AT PLANET EXPRESS?"},

    {word: "SEYMOUR",
    hint: "WHAT IS THE NAME OF FRY'S DOG?"},

    {word: "YANCY",
    hint: "WHAT IS THE NAME OF FRY'S BROTHER?"},
    
    {word: "FARNSWORTH",
    hint: "WHAT IS THE LAST NAME OF CHIEF EXECUTIVE OFFICER OF PLANET EXPRESS?"}
];

const state = {
    winningWord: null,
    winningWordIdx: 0, 
    charCounter: 0,
    previousGuesses: [],
    numOfWrongGuesses: 0,
};

function onKeyPress(e) { 
    const indexOfLetter = state.winningWord.indexOf(e.key.toUpperCase());
    const currentLetterKeyCode = e.keyCode;
    const currentLetter = String.fromCharCode(currentLetterKeyCode);
    const currentGuessedLetter = e.key.toUpperCase();
    const isGuessed = checkIfGuessed(currentGuessedLetter);
    const isLetterPresent = isLetterInWinningWord(currentGuessedLetter);
    const idxOfSameLetters = sameLettersExist(currentGuessedLetter);
   
    // checks if input is a letter, if it the correct letter, and when it is not the correct letter
    if (indexOfLetter >= 0) {
        state.previousGuesses.push(e.key);
        wordEl.children[indexOfLetter].textContent = e.key;
        state.charCounter++;
        // if there are multiple letters
        if (idxOfSameLetters.length > 1) {
            idxOfSameLetters.forEach(letterIdx => wordEl.children[letterIdx].textContent = e.key);
            state.charCounter++;
        } 
        for(let letterEl of alphaEl.children) {
            if(letterEl.textContent === currentGuessedLetter) {
                letterEl.style.color = "green";
            }
        }
        msgEl.textContent = `Why yes, there is a '${currentGuessedLetter}' in the word`;
        msgBoxEl.style.display = "block";
    } else if ((e.keyCode >= 65 && e.keyCode <= 90) === false) {
        msgEl.textContent = `'${currentGuessedLetter}' is not a letter`;
        msgBoxEl.style.display = "block";
        return;
    } else if (isGuessed === true) {
        msgEl.textContent = `'${currentGuessedLetter}' has already been guessed. Try a different letter`;
        msgBoxEl.style.display = "block";
        return;
    } else if (isLetterPresent === false) {
        state.previousGuesses.push(e.key);
        for(let letterEl of alphaEl.children) { 
            if(letterEl.textContent === currentGuessedLetter) {
                letterEl.style.color = "red";
            }
        }
        msgEl.textContent = `'${currentGuessedLetter}' is not a letter in the word`;
        msgBoxEl.style.display = "block";
        removeLife();
    }
    checkForWin(state.charCounter);
}

function getWinningWordAndHint(){
    // generates a random number between 1 and the length of the wordBank bank to choose which word will be guessed
    state.winningWord = wordBank[Math.floor(Math.random() * wordBank.length)].word;
    
    // winningWordIdx gets index of winning word to select corresponding hint
    state.winningWordIdx = wordBank.findIndex(x => x.word === state.winningWord);

    // Updates hint corresponding with winning word
    state.winningHint = wordBank[state.winningWordIdx].hint;
    hintEl.innerHTML = state.winningHint;
}

// create loop to equate to the number of boxes and length of word
function addBoxes() {
    document.querySelector('.word').innerHTML = '';
    for(let i = 0; i < state.winningWord.length; i++) {
        createBox();
    }
}

// creates a new letter box for the winning word
function createBox() {
    const newBox = document.createElement("div");
    // adds boxes class to div that is created
    newBox.classList.add("boxes", "boxes-letters");
    document.querySelector(".word").appendChild(newBox);
}

// checks if number of correct characters in box matches the winning word
function checkForWin(charCounter) {
    if(state.charCounter === state.winningWord.length) {
        msgEl.textContent = 'YOU WIN! You guessed the word correctly! Play again?';
        msgBoxEl.style.display = "block";
        document.removeEventListener('keydown', onKeyPress);
    }
}

// checks if a letter was already guessed
function checkIfGuessed(currentGuessedLetter) {
    for(let i = 0; i < state.previousGuesses.length; i++) {
        if(currentGuessedLetter === state.previousGuesses[i].toUpperCase()) {
            return true;
        }
    }
    return false;
}

// function to see if a letter is in the winning word
function isLetterInWinningWord(letter) {
    for (let i = 0; i < state.winningWord.length; i++) {
        if(state.winningWord[i] === letter) {
            return true;
        }
    }
    return false;
}

// removes a life with incorrect guess
function removeLife() {
    state.numOfWrongGuesses++;
    for(let i = 0; i < state.numOfWrongGuesses; i++) {
        livesEl.children[i].style.backgroundColor = "red";
    }
    if(state.numOfWrongGuesses > 5) {
        msgEl.textContent = 'Sorry, you ran out of lives. Play again?';
        msgBoxEl.style.display = "block";
        document.removeEventListener('keydown', onKeyPress);
    }
}

// checks if there are more than one same letters in the winning word
function sameLettersExist(letter) {
    const idxOfTwoLetters = [];
    let i = -1;
    while((i = state.winningWord.indexOf(letter, i+1)) >= 0) idxOfTwoLetters.push(i); {
        return idxOfTwoLetters;
    }
}

// initalizes the game and resets to default
function init() {
    state.winningWord = null;
    state.winningWordIdx = 0;
    state.charCounter = 0;
    state.previousGuesses = [];
    state.numOfWrongGuesses = 0;
    
    msgEl.textContent = "Press a key to guess the word";

    getWinningWordAndHint();
    addBoxes();

    for (let letterEl of alphaEl.children) {
        letterEl.style.color = "black";
    }

    for(let i = 0; i < livesEl.children.length; i++) {
        livesEl.children[i].style.background = "green";
    }

    document.addEventListener("keydown", onKeyPress);
}

init();