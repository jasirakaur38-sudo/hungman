const words = ["apple", "banana", "grapes", "orange", "mango"];

let word = "";
let guessedLetters = [];
let remainingGuesses = 6;
let gameOver = false;

// Elements
const input = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const wordDisplay = document.getElementById("wordDisplay");
const guessesArea = document.getElementById("guessesArea");

// Start Game
function startGame() {
    word = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    remainingGuesses = 6;
    gameOver = false;

    guessesArea.innerText = "Game started! Enter a letter.";
    updateDisplay();
}

// Update Display
function updateDisplay() {
    let display = "";

    for (let letter of word) {
        if (guessedLetters.includes(letter)) {
            display += letter + " ";
        } else {
            display += "_ ";
        }
    }

    wordDisplay.innerText = display.trim();
}

// Handle Guess
function makeGuess() {
    let guess = input.value.toLowerCase();

    // ✅ Clear input field
    input.value = "";

    // ❌ No guessing before starting game
    if (!word) {
        guessesArea.innerText = "Please start the game first!";
        return;
    }

    // ❌ Stop guessing after game over
    if (gameOver) {
        guessesArea.innerText = "Game is finished. Start a new game.";
        return;
    }

    // ❌ Empty input
    if (guess === "") return;

    // ❌ Duplicate guess check
    if (guessedLetters.includes(guess)) {
        guessesArea.innerText = "You already guessed that letter!";
        return;
    }

    guessedLetters.push(guess);

    if (word.includes(guess)) {
        guessesArea.innerText = "Good guess!";
    } else {
        remainingGuesses--;
        guessesArea.innerText = "Wrong guess! Remaining: " + remainingGuesses;
    }

    updateDisplay();
    checkGameStatus();
}

// Check Win/Lose
function checkGameStatus() {
    let won = word.split("").every(letter => guessedLetters.includes(letter));

    // ✅ Win dialog in guesses area
    if (won) {
        guessesArea.innerText = "🎉 You WON!";
        gameOver = true;
    }

    // ❌ Lose dialog in guesses area
    if (remainingGuesses <= 0) {
        guessesArea.innerText = "😢 You LOST! Word was: " + word;
        gameOver = true;
    }
}

// Button click
guessBtn.addEventListener("click", makeGuess);