import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      window.alert('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

const dateTimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');

options.onClose([options.defaultDate]);
flatpickr(dateTimePicker, options);

const timerValues = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let countdownInterval;

startButton.addEventListener('click', startCountdown);

function startCountdown() {
  const selectedDate = new Date(dateTimePicker.value).getTime();

  if (isNaN(selectedDate)) {
    window.alert('Invalid date');
    return;
  }

  countdownInterval = setInterval(() => updateTimer(selectedDate), 1000);
  startButton.disabled = true;
}

function updateTimer(endDate) {
  const currentDate = new Date().getTime();
  const timeRemaining = endDate - currentDate;

  if (timeRemaining <= 0) {
    clearInterval(countdownInterval);
    resetTimerValues();
    window.alert('Countdown complete!');
    startButton.disabled = false;
  } else {
    const { days, hours, minutes, seconds } = convertMs(timeRemaining);
    updateTimerValues(days, hours, minutes, seconds);
  }
  console.log('salut');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimerValues(days, hours, minutes, seconds) {
  timerValues.days.textContent = addLeadingZero(days);
  timerValues.hours.textContent = addLeadingZero(hours);
  timerValues.minutes.textContent = addLeadingZero(minutes);
  timerValues.seconds.textContent = addLeadingZero(seconds);
}

function resetTimerValues() {
  updateTimerValues(0, 0, 0, 0);
}

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}
