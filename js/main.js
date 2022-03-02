// Constants
const mainEl = document.querySelector("main");
const messageBoxEl = document.querySelector(".message-box");
const msgEl = document.querySelector(".message-box > h3");
const playAgainEl = document.querySelector(".message-box > button");

// Getting words for game
const wordList = [
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


];

// generates a random number between 1 and the length of the wordList bank to choose which word will be guessed

const winningWord = wordList[Math.floor(Math.random() * wordList.length)].word;
console.log(winningWord);



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

const keyDown = document.addEventListener("keydown", checkLetter);

// index of letter is shown in the string
// if index of letter = -1; it's not in the string
// if +# = the position of the letter in the string
function checkLetter(e) {
    console.log(e);
    const indexOfLetter = winningWord.indexOf(e.key.toUpperCase());
    console.log(indexOfLetter);
};

// Check if letter matches current (winning) word

function checkWin() {
    if(checkLetter >= 0) {
        const addLetter = document.querySelector(".boxes").innerHTML = "A";
        // let letter at the at index be displayed in the boxes and highlight letter green
    } else {
        // remove a life and highlight letter red
    }; 
};

checkWin();





// // app's state (variables)
// let lose = numGuesses > maxGuesses;
// let maxGuesses = 6;


// cached element references


// event listeners



// // functions

// function getLetter() {
//     const 
// }









