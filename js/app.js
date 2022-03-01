// Getting words for game
const wordList = [
    {word: "PLANET EXPRESS",
    clue: "COMPANY OWNED BY PROFESSOR FARNSWORTH"},

    {word: "LEELA",
    clue: "CAPTAIN OF THE PLANET EXPRESS SHIP"},

    {word: "ORANGE",
    clue: "COLOUR OF FRY'S HAIR"}
];

// Constants






















// const mainEl = document.querySelector("main");

// const gameList = [
//     {word: "Planet Express",
//     question: "The company owned by Professor Farnsworth"},
//     {word: ""

//     }

// ]

// function guessedLetter(letter) {
//     state.currenGuessMatrix[state.wordIdx][state.letterIdx] = letter.toUpperCase()
// }

// document.addEventListener("keydown", function (e) {
//     if(e.keyCode >= 65 && e.keyCode <= 90) {
//         console.log(e);
//     } else if (e.key === "Backspace") {
//         console.log("backspace");
//     }
// })

// // intialize to refresh game then after, render the game

// function init() {
//     state.winningWord = null;
//     state.letterIdx = 0;
//     state.wordIdx = 0;
//     state.currentGuessMatrix.forEach((row, rowIdx) => {
//         row.forEach(
//             (letter, letterIdx) =>
//                 (state.currenGuessMatrix[rowIdx][letterIdx] = null)
//         );
//     }

//     render();
// }

// function render() {
//     let rowIdx = 0;
//     for (let row of mainEl.children) {
//         let letterIdx = 0;
//         for(let letter of row.children) {
//             letter.textContent = state.currentGuessMatrix[rowIdx][letterIdx];
//             letterIdx++;

//         }
//     }
// }