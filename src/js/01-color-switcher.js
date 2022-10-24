const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timetId;


buttonStart.addEventListener('click', handleStart);
buttonStop.addEventListener('click', handleStop);
buttonStop.disabled = true;

function handleStart() {
    timetId = setInterval ( () => {
        body.style.backgroundColor  = getRandomHexColor();                
    }, 1000);
    body.style.backgroundColor  = getRandomHexColor();
    buttonStart.disabled = true;
    buttonStop.disabled = false;
}

function handleStop() {
    if (timetId) {
        clearInterval(timetId);
    }
    buttonStart.disabled = false;
    buttonStop.disabled = true;
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
