const circleColors = ['#c0334d', '#d6618f', '#f3d4a0', '#f1931b', '#8f715b', '#16D9E3'];
const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
let intervalId = 0;
let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
  event.preventDefault();
  screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'));
    screens[1].classList.add('up');
    startGame();
  }
});

board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function createRandomCircle() {
  const circle = document.createElement('div');
  const size = getRandomNumber(10, 60);
  const color = getRandomColor();
  const {width, height} = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);

  circle.classList.add('circle');
  circle.style.background = color;
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${x}px`;
  circle.style.left = `${y}px`;

  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  const index = Math.floor(Math.random() * circleColors.length);
  return circleColors[index];
}

function startGame() {
  intervalId = setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function finishGame() {
  timeEl.parentNode.classList.add('hide');
  board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`;
  clearInterval(intervalId);
  setTimeout(() => {
    time = 0;
    score = 0;
    screens.forEach((screen) => {
      screen.classList.remove('up');
    });
    board.innerHTML = ``;
    timeEl.parentNode.classList.remove('hide');
  }, 3000);
}
