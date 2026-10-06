const pads = Array.from(document.querySelectorAll('.pad'));
const startButton = document.querySelector('#start-button');
const levelElement = document.querySelector('#level');
const statusElement = document.querySelector('#status');

const game = {
  sequence: [],
  playerIndex: 0,
  isShowing: false,
  isRunning: false,
  runId: 0
};

const SHOW_TIME = 500;
const GAP_TIME = 250;

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function setInputEnabled(enabled) {
  pads.forEach((pad) => {
    pad.classList.toggle('is-disabled', !enabled);
    pad.setAttribute('aria-disabled', String(!enabled));
  });
}

function flashPad(index) {
  const pad = pads[index];
  pad.classList.add('active');

  return delay(SHOW_TIME).then(() => {
    pad.classList.remove('active');
  });
}

async function playSequence(runId) {
  game.isShowing = true;
  setInputEnabled(false);
  statusElement.classList.remove('is-error');
  statusElement.textContent = 'Смотрите последовательность…';

  await delay(450);

  for (const index of game.sequence) {
    if (runId !== game.runId || !game.isRunning) return;

    await flashPad(index);

    if (runId !== game.runId || !game.isRunning) return;
    await delay(GAP_TIME);
  }

  if (runId !== game.runId || !game.isRunning) return;

  game.isShowing = false;
  game.playerIndex = 0;
  setInputEnabled(true);
  statusElement.textContent = 'Теперь повторите.';
}

function addRandomStep() {
  const next = Math.floor(Math.random() * pads.length);
  game.sequence.push(next);
  levelElement.textContent = `Уровень: ${game.sequence.length}`;
}

async function nextRound(runId) {
  if (runId !== game.runId || !game.isRunning) return;

  addRandomStep();
  await playSequence(runId);
}

function finishGame() {
  const reachedLevel = game.sequence.length;
  game.isRunning = false;
  game.isShowing = false;
  game.runId += 1;
  setInputEnabled(false);

  pads.forEach((pad) => pad.classList.remove('active'));

  statusElement.classList.add('is-error');
  statusElement.textContent = `Ошибка. Вы дошли до уровня ${reachedLevel}. Нажмите «Старт», чтобы сыграть снова.`;
  startButton.textContent = 'Старт заново';
}

async function handlePlayerClick(index) {
  if (!game.isRunning || game.isShowing) return;

  const runId = game.runId;
  await flashPad(index);

  if (runId !== game.runId || !game.isRunning || game.isShowing) return;

  const expected = game.sequence[game.playerIndex];

  if (index !== expected) {
    finishGame();
    return;
  }

  game.playerIndex += 1;

  if (game.playerIndex === game.sequence.length) {
    setInputEnabled(false);
    statusElement.textContent = 'Верно! Следующий уровень…';
    await delay(650);

    if (runId !== game.runId || !game.isRunning) return;
    await nextRound(runId);
  }
}

function startGame() {
  game.runId += 1;
  const runId = game.runId;

  game.sequence = [];
  game.playerIndex = 0;
  game.isShowing = false;
  game.isRunning = true;

  pads.forEach((pad) => pad.classList.remove('active'));
  statusElement.classList.remove('is-error');
  statusElement.textContent = 'Игра начинается…';
  levelElement.textContent = 'Уровень: 0';
  startButton.textContent = 'Начать заново';
  setInputEnabled(false);

  nextRound(runId);
}

pads.forEach((pad) => {
  pad.addEventListener('click', () => {
    handlePlayerClick(Number(pad.dataset.pad));
  });
});

startButton.addEventListener('click', startGame);
setInputEnabled(false);
