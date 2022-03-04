// Constants
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

// let guessedWord = [];
// const state.previousGuesses = [];
// const maxGuesses = 6;
// let state.charCounter = 0;
// let state.numOfWrongGuesses = 0;


// Getting words for game
const wordBank = [
    {word: "BENDER",
    hint: "CHEIF OF PLANET EXPRESS"},

    {word: "LEELA",
    hint: "CAPTAIN OF THE PLANET EXPRESS SHIP"},
    
    {word: "ORANGE",
    hint: "COLOUR OF FRY'S HAIR"},
    
    {word: "SLURM",
    hint: "NAME OF FRY'S FAVOURITE DRINK"},
    
    {word: "MARS",
    hint: "WHAT PLANET DOES AMY'S PARENTS LIVE ON?"},
    
    {word: "NIBBLER",
    hint: "WHAT IS THE NAME OF LEELA'S PET?"}

];

const state = {
    winningWord: null,
    winningWordIdx: 0, 
    charCounter: 0,
    previousGuesses: [],
    numOfWrongGuesses: 0,
};



// keyboard down, is the character in the current word (two small functions)
// const keyDown = document.addEventListener("keydown", keyIsPressed);

function keyIsPressed(e) { 
    const indexOfLetter = state.winningWord.indexOf(e.key.toUpperCase());
    const currentLetterKeyCode = e.keyCode;
    const currentLetter = String.fromCharCode(currentLetterKeyCode);
    const currentGuessedLetter = e.key.toUpperCase();
    const isGuessed = checkIfGuessed(currentGuessedLetter);
    const isLetterPresent = isLetterInWinningWord(currentGuessedLetter);
    const idxOfSameLetters = sameLettersExist(currentGuessedLetter);
    // checks if input is a letter. If not, returns and displays message but no life is lost
    // colors incorrect letter red
    if (indexOfLetter >= 0) {
        state.previousGuesses.push(e.key);
        wordEl.children[indexOfLetter].textContent = e.key;
        state.charCounter++;
        // if there are multiple letters
        if (idxOfSameLetters.length > 1) {
            idxOfSameLetters.forEach(letterIdx => wordEl.children[letterIdx].textContent = e.key);
            state.charCounter++;
        } for(let letterEl of alphaEl.children) {
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
        // // turn letter red for incorrect guess
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

// const replay = document.addEventListener("onClick", keyIsPressed);


// create loop to equate to the number of boxes and length of word
function addBoxes() {
    document.querySelector('.word').innerHTML = '';
    for(let i = 0; i < state.winningWord.length; i++) {
        createBox();
    }
}

function createBox() {
    const newBox = document.createElement("div");
    // adds boxes class to div that is created
    newBox.classList.add("boxes", "boxes-letters");
    document.querySelector(".word").appendChild(newBox);
}

function checkForWin(charCounter) {
    if(state.charCounter === state.winningWord.length) {
        msgEl.textContent = 'You guess the word correctly!';
        msgBoxEl.style.display = "block";
        document.removeEventListener('keydown', keyIsPressed);
    } else {
        return;
    }
}

// Helper functions

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
// if a variable is global, don't need to include it as a param in a function
function isLetterInWinningWord(letter) {
    for (let i = 0; i < state.winningWord.length; i++) {
        if(state.winningWord[i] === letter) {
            return true;
        }
    }
    return false;
}

function removeLife() {
    state.numOfWrongGuesses++;
    for(let i = 0; i < state.numOfWrongGuesses; i++) {
        livesEl.children[i].style.backgroundColor = "red";
    }
    if(state.numOfWrongGuesses > 5) {
        msgEl.textContent = 'You ran out of lives. Try again?';
        msgBoxEl.style.display = "block";
        document.removeEventListener('keydown', keyIsPressed);
        // quit game
    }
}

function sameLettersExist(letter) {
    const idxOfTwoLetters = [];
    let i = -1;
    
    while((i = state.winningWord.indexOf(letter, i+1)) >= 0) idxOfTwoLetters.push(i) ;{
        return idxOfTwoLetters;
    }
}

function startGame() {
    state.winningWord = null;
    state.winningWordIdx = 0;
    state.charCounter = 0;
    state.previousGuesses = [];
    state.numOfWrongGuesses = 0;
    getWinningWordAndHint();
    addBoxes();

    for (let letterEl of alphaEl.children) {
        letterEl.style.color = "black";
    }

    for(let i = 0; i < livesEl.children.length; i++) {
        livesEl.children[i].style.background = "green";
    }

    document.addEventListener("keydown", keyIsPressed);
}

startGame();

document.getElementById('restart-button').addEventListener('click', startGame);



// function init() {
//     state. 
// }


// function checkWin(guessedWord) {
//     const checkGuessedWord =  guessedWord.join('');
//     console.log(checkGuessedWord.toUpperCase())
//     if(checkGuessedWord === winningWord) {
//         msgEl.textContent = "You correctly guessed the word!";
//         msgBoxEl.style.display = "block";
//     } else {
//         // IF WORD REACHES MAX LIVES    
//         console.log("no");
//     }
// }


    // } if (isCharacterALetter(e.key) === true) {
    //     console.log("NOT A LETTER");
    //     msgEl.textContent = `'${currentGuessedLetter}' is not a letter`;
    //     msgBoxEl.style.display = "block";
    //     } else if(indexOfLetter >= 0) {
    //     findLettersInWinningWord;
    // }






    


// function findAndkeyIsPresseds(e) {
//     for(let i = 0; i < winningWord.length; i++) {
//         if(e.key.toUpperCase() === winningWord[i]) {

//         }
//     }
// }

// playAgainEl.addEventListener("click", init);

// function init() {
//     msgEl.textContent = "";
//     msgBoxEl.style.display = "none";
// }


// function render() {

// }



// const correctLetter = [];
// function previouslyGuessed(e){
//     for(let i = 0; i < )
// }


    // for(let i = 0; i < winningWord.length; i++) {
    //     if(winningWord.includes(currentLetter)) {
    //         // find correct position
    //         boxesEl.innerHTML = currentLetter;
    //     }
    //     else {
    //         return;
    //     }
    // }

// }


// TO-DO:
// 1) get letter to appear in correct box [DONE]
// 2) change colour of letter when correct or incorrect letter is guessed
// 3) remove life (change colour of circle to red) if incorrect letter is guessed
// 4) display winning or losing message
// 5) get functioning reset button (render function)
// create init function









    // function to see if isGuessed is a letter in the winning word



    // if(e.keyCode > 64 && e.keyCode < 91) {
    //     const correctLetter = false;
    //     const previouslyEnteredLetter = false;
     

    
    //     if (previouslyEnteredLetter === true) {
    //         state.previousGuesses.push(currentGuessedLetter);
    //         console.log(state.previousGuesses);

    //         for (let i = 0; i < wordArray.length; i++) {
    //             if(currentGuessedLetter === wordArray[i]) {
    //                 correctLetter = true;
    //                 wordEl.children[indexOfLetter].textContent = e.key;
    //             }
    //             console.log("ok");
    //         }
    //     }

    // }


// function isCharacterALetter(currentLetterKeyCode) {
//     if (e.keyCode >= 65 && e.keyCode <= 90) {
//         return true;
//     } else {
//         return false;
//     }
// }



 // removes all white space due to grid
    // let guessedWord = wordEl.textContent.replace(/\s/g, '');
    // let guessedWordArray = guessedWord.split('');

    // console.log(guessedWord);
