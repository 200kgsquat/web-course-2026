const guessForm = document.querySelector('#guess-form');
const guessInput = document.querySelector('#guess-input');
const errorMessage = document.querySelector('#error-message');
const statusMessage = document.querySelector('#status');
const attemptCounter = document.querySelector('#attempt-counter');
const historyList = document.querySelector('#history-list');
const historyEmpty = document.querySelector('#history-empty');
const newGameButton = document.querySelector('#new-game-button');

let secretNumber = '';
let attempts = [];
let gameFinished = false;

function generateSecretNumber() {
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const result = [];

  while (result.length < 4) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    const [digit] = digits.splice(randomIndex, 1);
    result.push(digit);
  }

  return result.join('');
}

function validateGuess(value) {
  if (!/^\d{4}$/.test(value)) {
    return 'Введите ровно 4 цифры.';
  }

  if (new Set(value).size !== 4) {
    return 'Все 4 цифры должны быть разными.';
  }

  return '';
}

function countBullsAndCows(secret, guess) {
  let bulls = 0;
  let cows = 0;

  for (let i = 0; i < guess.length; i += 1) {
    if (guess[i] === secret[i]) {
      bulls += 1;
    } else if (secret.includes(guess[i])) {
      cows += 1;
    }
  }

  return { bulls, cows };
}

function getWord(number, one, few, many) {
  const mod10 = number % 10;
  const mod100 = number % 100;

  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

function renderHistory() {
  const items = attempts.map((attempt) => {
    const item = document.createElement('li');
    const bullWord = getWord(attempt.bulls, 'бык', 'быка', 'быков');
    const cowWord = getWord(attempt.cows, 'корова', 'коровы', 'коров');
    item.textContent = `${attempt.guess} → ${attempt.bulls} ${bullWord}, ${attempt.cows} ${cowWord}`;
    return item;
  });

  historyList.replaceChildren(...items);
  historyEmpty.hidden = attempts.length !== 0;
  attemptCounter.textContent = `Попыток: ${attempts.length}`;
}

function startNewGame() {
  secretNumber = generateSecretNumber();
  attempts = [];
  gameFinished = false;

  guessInput.disabled = false;
  guessForm.querySelector('button[type="submit"]').disabled = false;
  guessInput.value = '';
  errorMessage.textContent = '';
  statusMessage.textContent = 'Новая игра началась.';
  statusMessage.classList.remove('is-win');

  renderHistory();
  guessInput.focus();
}

function checkGuess(value) {
  const validationError = validateGuess(value);

  if (validationError) {
    errorMessage.textContent = validationError;
    return;
  }

  const { bulls, cows } = countBullsAndCows(secretNumber, value);

  attempts.push({
    guess: value,
    bulls,
    cows
  });

  errorMessage.textContent = '';
  renderHistory();

  if (bulls === 4) {
    gameFinished = true;
    statusMessage.textContent = `Победа! Угадано за ${attempts.length} ${getWord(attempts.length, 'попытку', 'попытки', 'попыток')}.`;
    statusMessage.classList.add('is-win');
    guessInput.disabled = true;
    guessForm.querySelector('button[type="submit"]').disabled = true;
    return;
  }

  statusMessage.textContent = `Результат: ${bulls} ${getWord(bulls, 'бык', 'быка', 'быков')}, ${cows} ${getWord(cows, 'корова', 'коровы', 'коров')}.`;
  guessInput.value = '';
  guessInput.focus();
}

guessForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (gameFinished) return;

  checkGuess(guessInput.value.trim());
});

newGameButton.addEventListener('click', startNewGame);

startNewGame();
