import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// Add refs. document.querySelector

const refs = {
  textInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  dataDays: document.querySelector('span[data-days]'),
  dataHours: document.querySelector('span[data-hours]'),
  dataMinutes: document.querySelector('span[data-minutes]'),
  dataSeconds: document.querySelector('span[data-seconds]'),
};

let chooseDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    chooseDate = selectedDates[0].getTime();
    const currentDate = Date.now();
    const deltaTime = currentDate - chooseDate;
    // allert window
    if (deltaTime >= 0) {
      Notiflix.Notify.info('Please choose a date in the future');
    } else {
      refs.startBtn.disabled = false;
    }
  },
};
// flatpickr(selector, options);
flatpickr(refs.textInput, options);

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', () => {
  timer.start();
});

const timer = {
  intervalId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    refs.textInput.disabled = true;
    refs.startBtn.disabled = true;
    this.intervalId = setInterval(() => {
      const dateNow = Date.now();
      const delta = chooseDate - dateNow;
      const { days, hours, minutes, seconds } = convertMs(delta);
      if (delta <= 0) {
        timer.stop();
      }
      clockUpdate(days, hours, minutes, seconds);
    }, 1000);
  },
  stop() {
    this.isActive = false;
    refs.textInput.disabled = false;
    refs.startBtn.disabled = false;
    clearInterval(this.intervalId);
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor((ms % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function clockUpdate(days, hours, minutes, seconds) {
  refs.dataDays.textContent = days;
  refs.dataHours.textContent = hours;
  refs.dataMinutes.textContent = minutes;
  refs.dataSeconds.textContent = seconds;
}
