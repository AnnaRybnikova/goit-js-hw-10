import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import errorIconUrl from "../img/error.svg";

let userSelectedDate;

const inputEl = document.querySelector("input#datetime-picker");
const startBtnEl = document.querySelector("button[data-start]");
const daysSpanEl = document.querySelector("span[data-days]");
const hoursSpanEl = document.querySelector("span[data-hours]");
const minutesSpanEl = document.querySelector("span[data-minutes]");
const secondsSpanEl = document.querySelector("span[data-seconds]");

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    locale: {
        firstDayOfWeek: 1
    },
    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
                class: 'custom-noty error',
                position: 'topRight',
                iconUrl: errorIconUrl,
            });
            startBtnEl.setAttribute("disabled", true);
        } else if (selectedDates[0] > Date.now()) {
            startBtnEl.removeAttribute("disabled");
        }
        userSelectedDate = selectedDates[0];
    },
};

flatpickr(inputEl, options);

const clickHandler = () => {
    let userTimeMs = userSelectedDate.getTime() - Date.now();
    const intervalId = setInterval(() => {
        inputEl.setAttribute("disabled", true);
        startBtnEl.setAttribute("disabled", true);
        userTimeMs -= 1000;

        const { days, hours, minutes, seconds } = convertMs(userTimeMs);
        daysSpanEl.textContent = addLeadingZero(days);
        hoursSpanEl.textContent = addLeadingZero(hours);
        minutesSpanEl.textContent = addLeadingZero(minutes);
        secondsSpanEl.textContent = addLeadingZero(seconds);

        if (userTimeMs < 1000) {
            clearInterval(intervalId);
            
        inputEl.removeAttribute("disabled");
    }
    }, 1000);
}

startBtnEl.addEventListener("click", clickHandler);

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

function addLeadingZero(value) {
    const valueStr = String(value);

    if (valueStr.length < 2) {
        return valueStr.padStart(2, "0");
    }
    return valueStr;
}