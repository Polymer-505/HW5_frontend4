const keys = ["a", "s", "d", "f", "g", "h", "j", "k", "l", "m"];

let currentKeyIndex = 0;
let isGameOver = false;

const keyElement = document.getElementById("key");
const statusElement = document.getElementById("status");
const newGameBtn = document.getElementById("new-game-btn");

function displayKeyName(key) {
  return key.toUpperCase();
}

function initGame() {
  currentKeyIndex = Math.floor(Math.random() * keys.length);
  isGameOver = false;

  keyElement.textContent = displayKeyName(keys[currentKeyIndex]);
  statusElement.textContent = "Гра триває. Натисніть правильну клавішу!";

  PNotify.success({
    text: "Гру розпочато! Натисніть підсвічену клавішу.",
    delay: 1000,
  });
}

window.addEventListener("keydown", (event) => {
  if (isGameOver) return;

  if (event.key.toLowerCase() === keys[currentKeyIndex].toLowerCase()) {
    currentKeyIndex = (currentKeyIndex + 1) % keys.length;

    keyElement.textContent = displayKeyName(keys[currentKeyIndex]);

    PNotify.success({
      text: "Правильно! Наступна клавіша.",
      delay: 1500,
    });
  } else {
    PNotify.error({
      text: `Помилка! Ви натиснули "${displayKeyName(event.key)}", а треба було "${displayKeyName(keys[currentKeyIndex])}".`,
      delay: 1000,
    });
  }
});

window.addEventListener("keypress", (event) => {
  event.preventDefault();
});

newGameBtn.addEventListener("click", () => {
  initGame();

  newGameBtn.blur();
});

initGame();
