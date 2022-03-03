// Constants
const mainEl = document.querySelector("main");
const msgBoxEl = document.querySelector(".message-box");
const msgEl = document.querySelector(".message-box > h3");
const playAgainEl = document.querySelector(".message-box > button");
const hintEl = document.querySelector(".title > h3");
const boxesEl = document.querySelector(".boxes");
const wordEl = document.querySelector(".word");
const alphaEl = document.querySelector(".alphabet");
const letterEl = document.querySelector(".letter");
const livesEl = document.querySelector(".lives");
const lifeEl = document.querySelector(".life");

const previousGuesses = new Array;
const wordArray = new Array;
const maxGuesses = 6;
let numOfWrongGuesses = 0;


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

const keyDown = document.addEventListener("keydown", main);



function main(e) { 
    const indexOfLetter = winningWord.indexOf(e.key.toUpperCase());
    const currentLetterKeyCode = e.keyCode;
    const currentLetter = String.fromCharCode(currentLetterKeyCode);
    const currentGuessedLetter = e.key.toUpperCase();

    const isGuessed = checkIfGuessed(currentGuessedLetter);


    if (isGuessed === true) {
        msgEl.textContent = `'${currentGuessedLetter}' has already been guessed. Try a different letter`;
        msgBoxEl.style.display = "block";
        return;
    } 

    const isLetterPresent = isLetterInWinningWord(currentGuessedLetter);
    const idxOfSameLetters = sameLettersExist(currentGuessedLetter);

    // const characterIsALetter = isCharacterALetter(currentLetterKeyCode);

    // checks if input is a letter. If not, returns and displays message but no life is lost
    if ((e.keyCode >= 65 && e.keyCode <= 90) === false) {
        msgEl.textContent = `'${currentGuessedLetter}' is not a letter`;
        msgBoxEl.style.display = "block";
        return;
    } else if (isLetterPresent === false) {
        removeLife();
        msgEl.textContent = `'${currentGuessedLetter}' is not a letter in the word`;
        msgBoxEl.style.display = "block";
    } 


    if (indexOfLetter >= 0) {
        wordEl.children[indexOfLetter].textContent = e.key;
        // if registered letter exists in alphabet
        if (idxOfSameLetters === true) {
            for(let element of idxOfSameLetters) {
                wordEl[idxOfSameLetters].textContent = e.key;
            }
        }
        // for of loop
        for(let letterEl of alphaEl.children) {
            if(letterEl.textContent === currentGuessedLetter) {
                letterEl.style.color = "green";
            }

        }
        msgEl.textContent = `Why yes, there is a '${currentGuessedLetter}' in the word`;
        msgBoxEl.style.display = "block";
    } 
} 


// if(sameLettersExist === true) {
//     wordEl.children[sameLettersExist].textContent = e.key;
//     console.log(sameLettersExist);
// } 













    // if (isLetterPresent <= maxGuesses) {
    //     isLetterPresentCounter++;
    //     // function to colour incorrect letter in alph
    //     // function to colour one life red
    //     removeLife();
    //     if(isLetterPresent === false) {
    //         removeLife();
    //     )





    // function to see if isGuessed is a letter in the winning word



    // if(e.keyCode > 64 && e.keyCode < 91) {
    //     const correctLetter = false;
    //     const previouslyEnteredLetter = false;
     

    
    //     if (previouslyEnteredLetter === true) {
    //         previousGuesses.push(currentGuessedLetter);
    //         console.log(previousGuesses);

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

// checks if a letter was already guessed
function checkIfGuessed(currentGuessedLetter) {
    for(let i = 0; i < previousGuesses.length; i++) {
        if(currentGuessedLetter === previousGuesses[i]) {
            return true;
        }
    }
    return false;
}

// function to see if a letter is in the winning word
// if a variable is global, don't need to include it as a param in a function
function isLetterInWinningWord(letter) {
    for (let i = 0; i < winningWord.length; i++) {
        if(winningWord[i] === letter) {
            return true;
        }
    }
    return false;
}

function removeLife() {
    // debugger;
    // lifeEl.style.backgroundColor = "red";
    // change name of numOfWrongGuesses
    numOfWrongGuesses++;
    for(let i = 0; i < numOfWrongGuesses; i++) {
        livesEl.children[i].style.backgroundColor = "red";
        if(numOfWrongGuesses > 6) {
            msgEl.textContent = 'You ran out of lives.';
            msgBoxEl.style.display = "block";
            // quit game
        }
    }
}


function sameLettersExist(letter) {
    const idxOfTwoLetters = [];
    let i = -1;

    while((i = winningWord.indexOf(letter, i+1)) >= 0) idxOfTwoLetters.push(i);
        return idxOfTwoLetters;
}



    // } if (isCharacterALetter(e.key) === true) {
    //     console.log("NOT A LETTER");
    //     msgEl.textContent = `'${currentGuessedLetter}' is not a letter`;
    //     msgBoxEl.style.display = "block";
    //     } else if(indexOfLetter >= 0) {
    //     findLettersInWinningWord;
    // }






    


// function findAndRegisterLetters(e) {
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











// // index of letter is shown in the string
// // if index of letter = -1; it's not in the string
// // if +# = the position of the letter in the string
// function registerLetter(e) {
//     console.log(e);
//     const indexOfLetter = winningWord.indexOf(e.key.toUpperCase());
//     const currentLetterKeyCode = e.keyCode;
//     const currentLetter = String.fromCharCode(currentLetterKeyCode);
//     const currentGuessedLetter = e.key.toUpperCase();
    
    
    
//     if (indexOfLetter >= 0) {
//         wordEl.children[indexOfLetter].textContent = e.key;
//         // if registered letter exists in alphabet

//         // for of loop
//         for(let letterEl of alphaEl.children) {
//             if(letterEl.textContent === currentGuessedLetter) {
//                 letterEl.style.color = "green";
//             }

//         }

//         msgEl.textContent = `Why yes, there is a '${currentGuessedLetter}' in the word`;
//         msgBoxEl.style.display = "block";

//     } else if (indexOfLetter < 0) {
//         console.log("wrong");

//         // 

//         for(let letterEl of alphaEl.children) {
//             if(letterEl.textContent !== currentGuessedLetter) {
//                 letterEl.style.color = "red";
//             }

//         }
//         // color life red
//         // lifeEl.style.color = "red";

//         msgEl.textContent = `No, there is no '${currentGuessedLetter}' in the word`;
//         msgBoxEl.style.display = "block";
//     }
// };
