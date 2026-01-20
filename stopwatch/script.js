let hours=0;
let minutes=0;
let seconds=0;
let timer=null;

const display=document.getElementById('display');
const startBtn=document.getElementById('start');
const stopBtn=document.getElementById('stop');
const resetBtn=document.getElementById('reset');

function updateDisplay() {
 
    const h=hours < 10 ? '0' + hours: hours;
    const m=minutes <10 ? '0'+ minutes: minutes;
    const s=seconds <10 ? '0'+seconds: seconds;

    display.textContent=`${h}:${m}:${s}`;
}

function startTimer() {
    if(timer !== null) 
        return;

    timer=setInterval(() => {
        seconds++;

        if(seconds === 60) {
            seconds=0;
            minutes++;  
        }

        if(minutes === 60){
            minutes=0;
            hours++;
        }

        updateDisplay();
    },1000);
}


function stopTimer() {
    clearInterval(timer);
    timer=null;
}

function resetTimer() {
    stopTimer();
    hours=0;
    minutes=0;
    seconds=0;
    updateDisplay();
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

