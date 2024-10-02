import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formEl = document.querySelector('.form');
const delayInputEl = document.querySelector('input[name="delay"]');
    
formEl.addEventListener("submit", (event) => {
    event.preventDefault();

    if (delayInputEl.value < 0) {
        createCautionNotification("Delay must be > 0");
        delayInputEl.value = '';
        return;
    }
    const selectedStateInputEl = document.querySelector("input[type='radio']:checked");

    makePromise({ delay: delayInputEl.value, state: selectedStateInputEl.value })
        .then(delay => createOkNotification(`Fulfilled promise in ${delay}ms`))
        .catch(delay => createErrorNotification(`Rejected promise in ${delay}ms`));
    
    formEl.reset(); 
})

const makePromise = ({ delay, state }) => {
  return new Promise((resolve, reject) => {
	   setTimeout(() => {
				if(state === "fulfilled") {
					resolve(delay)
				} else if (state === "rejected") {
					reject(delay)
				}
			}, delay);
  });
};

function createOkNotification(notyMessage) {
    iziToast.success({
        title: 'OK',
        message: notyMessage,
        class: 'custom-noty success',
        position: 'topRight',
        iconUrl: "./img/success.svg",
    });
}

function createErrorNotification(notyMessage) {
    iziToast.error({
        title: 'Error',
        message: notyMessage,
        class: 'custom-noty error',
        position: 'topRight',
        iconUrl: "./img/error.svg",
    });
}

function createCautionNotification(notyMessage) {
    iziToast.warning({
        title: 'Caution',
        message: notyMessage,
        class: 'custom-noty warning',
        position: 'topRight',
        iconUrl: "./img/warning.svg",
    });
}

function createInfoNotification(notyMessage) {
    iziToast.info({
        title: 'Hello',
        message: notyMessage,
        class: 'custom-noty info',
        position: 'topRight',
        iconUrl: "./img/info.svg",
    });
}