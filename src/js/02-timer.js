import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "flatpickr/dist/flatpickr.min.css";

daysEl = document.querySelector('span[data-days]');
hoursEl = document.querySelector('span[data-hours]');
minutesEl = document.querySelector('span[data-minutes]');
secondsEl = document.querySelector('span[data-seconds]');
inputEl = document.querySelector('#datetime-picker')
startBtn = document.querySelector('button[data-start]');

startBtn.classList.add('disable');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
        onClose(selectedDates) {
            const startDate = flatpickr.parseDate(selectedDates[0]).getTime();
            if (startDate < Date.now()) {
                Notify.failure('Please choose a date in the future');
                return;
            }
            startBtn.classList.remove('disable');
            countdownFn(startDate);
  },
};

const fp = flatpickr("#datetime-picker", options);

function countdownFn(startDate) {

    startBtn.addEventListener('click', () => {
        startBtn.classList.add('disable');
        inputEl.classList.add('disable')

        setInterval(() => { 
            const timeToZero = startDate - Date.now();
            const timeObj = convertMs(timeToZero);
            daysEl.innerHTML = addLeadingZero(timeObj.days);
            hoursEl.innerHTML = addLeadingZero(timeObj.hours);
            minutesEl.innerHTML = addLeadingZero(timeObj.minutes);
            secondsEl.innerHTML = addLeadingZero(timeObj.seconds);
        }, 1000);
    })
};

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

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

