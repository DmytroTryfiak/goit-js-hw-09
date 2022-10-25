import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const buttonStart = document.querySelector('[data-start]');
let selectedDate;
let timerId;

buttonStart.disabled = true;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = selectedDates[0];
        if (selectedDate <= new Date()) {
            Notify.failure('Please choose a date in the future');
            return;
        }
        buttonStart.disabled = false;
        updateCounterValue();
    },
};

flatpickr('input#datetime-picker', options);

buttonStart.addEventListener('click', startTimer);

function startTimer(event) {
    event.target.disabled = true;
    timerId = setInterval(updateCounterValue, 1000);
    const setValue = selectedDate - new Date();
    setTimeout(finishTimer, setValue);
}

function updateCounterValue() {
    const { days, hours, minutes, seconds } = convertMs(selectedDate - new Date());
    document.querySelector('[data-days]').textContent = addLeadingZero(days, 2);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours, 2);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes, 2);
    document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds, 2);
}

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
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value, minLength) {
    const str = new String(value);
    const length = str.length <= minLength ? minLength : str.length;
    return str.padStart(length, '0');
}

function finishTimer() {
    clearInterval(timerId);
}
