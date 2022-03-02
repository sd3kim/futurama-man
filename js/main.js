// Constants
const mainEl = document.querySelector("main");
const messageBoxEl = document.querySelector(".message-box");
const msgEl = document.querySelector(".message-box > h3");
const playAgainEl = document.querySelector(".message-box > button");
const hintEl = document.querySelector(".title > h3");
const boxesEl = document.querySelector(".boxes");
const wordEl = document.querySelector(".word");
const alphaEl = document.querySelector(".alphabet");
const letterEl = document.querySelector(".letter");

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

// generates a random number between 1 and the length of the wordBank bank to choose which word will be guessed

const winningWord = wordBank[Math.floor(Math.random() * wordBank.length)].word;
console.log(winningWord); 

// winningWordIdx gets index of winning word to select corresponding hint
const winningWordIdx = wordBank.findIndex(x => x.word === winningWord);

// Updates hint corresponding with winning word
const winningHint = wordBank[winningWordIdx].hint;
console.log(winningHint);
hintEl.innerHTML = winningHint;

// create loop to equate to the number of boxes and length of word
function addBoxes() {
    for(let i = 0; i < winningWord.length-1; i++) {
        createBox();
    };
};

function createBox() {
    const newBox = document.createElement("div");
    // adds boxes class to div that is created
    newBox.classList.add("boxes", "boxes-letters");
    document.querySelector(".word").appendChild(newBox);
};

addBoxes();

// keyboard down, is the character in the current word (two small functions)

const keyDown = document.addEventListener("keydown", registerLetter);


// index of letter is shown in the string
// if index of letter = -1; it's not in the string
// if +# = the position of the letter in the string
function registerLetter(e) {
    console.log(e);
    const indexOfLetter = winningWord.indexOf(e.key.toUpperCase());
    const currentLetterKeyCode = e.keyCode;
    const currentLetter = String.fromCharCode(currentLetterKeyCode);
    const letter = e.key.toUpperCase();

    console.log(indexOfLetter);

    if (indexOfLetter >= 0) {
        wordEl.children[indexOfLetter].textContent = e.key;
        // if registered letter exists in alphabet

        // for of loop
        for(let letterEl of alphaEl.children) {
            if(letterEl.textContent === letter) {
                letterEl.style.color = "green";
            }

        }
    } else {
        console.log("wrong");
        for(let letterEl of alphaEl.children) {
            if(letterEl.textContent !== letter) {
                letterEl.style.color = "red";
            }

        }
    }
};




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







// Change colour of alphabet 
// function changeColour(){
//     const 
// }


// Check if letter matches current (winning) word

// function checkWin(letter) {
//     if 


//     if(registerLetter >= 0) {
//         const addLetter = document.querySelector(".boxes").innerHTML = "A";

//         // let letter at the at index be displayed in the boxes and highlight letter green
//     } else {
//         // remove a life and highlight letter red
//     }; 
// };

// checkWin();

// const addLetter = boxesEl.innerHTML = "A";


// // app's state (variables)
// let lose = numGuesses > maxGuesses;
// let maxGuesses = 6
;


// cached element references


// event listeners



// // functions

// function getLetter() {
//     const 
// }



// TO-DO:
// 1) get letter to appear in correct box [DONE]
// 2) change colour of letter when correct or incorrect letter is guessed
// 3) remove life (change colour of circle to red) if incorrect letter is guessed
// 4) display winning or losing message
// 5) get functioning reset button (render function)
// create init function







