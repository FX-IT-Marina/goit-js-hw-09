// Get item by sector

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

let timerId = null;

// Function randomColor

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

// Add listener. setInerval (callback, delay, arg...)

startBtn.addEventListener('click', () => {
  //   timerId = null;
  if (timerId) {
    startBtn.disabled = true;
  }
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    console.log('start');
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.disabled = false;
  console.log('stop');
});
