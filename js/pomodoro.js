const PomodoroApp = document.querySelector(".app_pomodoro");
const DisplayContent = document.createElement("div");
DisplayContent.id = "displayContent";
DisplayContent.className = "displayPomodoro";
PomodoroApp.append(DisplayContent);

const PomodoroTimer = document.createElement("div");
PomodoroTimer.id = "pomodoroTimer";
PomodoroTimer.className = "displayPomodoro--timer";
const PomodoroConfig = document.createElement("div");
PomodoroConfig.id = "pomodoroConfig";
PomodoroConfig.className = "displayPomodoro--config";
DisplayContent.append(PomodoroTimer,PomodoroConfig);

/* const DisplayHours = document.createElement("span");
DisplayHours.id = "hours";
DisplayHours.textContent = formatValue(0); */
const DisplayMinutes = document.createElement("span");
DisplayMinutes.id = "minutes";
DisplayMinutes.textContent = formatValue(0);
const DisplaySeconds = document.createElement("span");
DisplaySeconds.id = "seconds";
DisplaySeconds.textContent = formatValue(0);
const point = ":";
PomodoroTimer.append(/* DisplayHours,point, */DisplayMinutes,point,DisplaySeconds);

const PomodoroConfigContentInput = document.createElement("div");
PomodoroConfigContentInput.id = "ConfigInputContainer";
PomodoroConfigContentInput.className = "pomodoroConfig--input";
const PomodoroConfigContentBtn = document.createElement("div");
PomodoroConfigContentBtn.id = "ConfigBtnContainer";
PomodoroConfigContentBtn.className = "pomodoroConfig--btn";
PomodoroConfig.append(PomodoroConfigContentInput,PomodoroConfigContentBtn);

const spanSession = document.createElement("span");
spanSession.className = "spanSession";
const textSession = document.createElement("p");
textSession.textContent = "Session: ";
const inputSession = document.createElement("input");
inputSession.type = "number";
inputSession.id = "amountSession";
inputSession.value = "1";
inputSession.min = "1";
const spanTimer = document.createElement("span");
spanTimer.className = "spanSession";
const textTimer = document.createElement("p");
textTimer.textContent = "Tiempo: ";
const inputTimer = document.createElement("input");
inputTimer.type = "number";
inputTimer.id = "amountTimer";
inputTimer.value = "5";
inputTimer.min = "5";
inputTimer.step = "5";
spanSession.append(textSession,inputSession);
spanTimer.append(textTimer,inputTimer);
PomodoroConfigContentInput.append(spanSession,spanTimer);

const BtnStart = document.createElement("button");
BtnStart.id = "btnStartKhrono";
BtnStart.textContent = "Activar";
BtnStart.disabled = false;
BtnStart.onclick = () => {
    startTimer();
}
const BtnStop = document.createElement("button");
BtnStop.id = "btnStopKhrono";
BtnStop.textContent = "Reiniciar";
BtnStop.disabled = true;
BtnStop.onclick = () => {
    stopTimer(countPomodoro);
}
const BtnReset = document.createElement("button");
BtnReset.id = "btnResetKhrono";
BtnReset.textContent = "Resetear";
BtnReset.disabled = false;
BtnReset.onclick = () => {
    resetPomodoro(countPomodoro);
}
PomodoroConfigContentBtn.append(BtnStart,BtnStop,BtnReset);

const ActiveSound = new Audio("../assets/sounds/pomodoro.mp3");
let countPomodoro;
let minutesValue = 0;
let secondsValue = 0;
let etapas = 0;

if(inputTimer) {
    minutesValue = inputTimer.value;
    inputTimer.addEventListener("change",() =>{
        if (inputTimer.value < 5){
            inputTimer.value = 5;
        }
        minutesValue = inputTimer.value;
    });
};

function startTimer() {
    BtnStart.disabled = true;
    BtnStop.disabled = false;
    inputSession.disabled = true;
    inputTimer.disabled = true;
    DisplayMinutes.textContent = formatValue(minutesValue);
    countPomodoro = setInterval(() => {
            if(secondsValue == 0){
                if(minutesValue != 0){
                    minutesValue -= 1;
                    DisplayMinutes.textContent = formatValue(minutesValue);
                } else {
                    stopTimer(countPomodoro);
                    pauseState();
                    ActiveSound.play();
                    return;
                }
                secondsValue = 59;
                DisplaySeconds.textContent = formatValue(secondsValue);
            } else {
                secondsValue -= 1;
                DisplaySeconds.textContent = formatValue(secondsValue);
            }
    }, 100);
}
function pauseState() {
    inputSession.value -= 1;
    if(inputSession.value == etapas) {
        resetPomodoro(countPomodoro);
        return;
    } else {
        let delay;
        if(inputTimer.value <= 30){
            delay = 1000*300;
        } else {
            delay = 1000*600;
        };
        const pause = setTimeout(() => {
            minutesValue = inputTimer.value;
            startTimer();
        }, delay);
    }
}
function stopTimer(countName) {
    ActiveSound.pause();
    ActiveSound.currentTime = 0;
    clearInterval(countName);
    DisplaySeconds.textContent = "00";
    DisplayMinutes.textContent = "00";
    secondsValue = 0;
    minutesValue = inputTimer.value;
    BtnStart.disabled = false;
    BtnStop.disabled = true;
    inputSession.disabled = false;
    inputTimer.disabled = false;
}
function resetPomodoro(countName) {
    stopTimer(countName);
    inputSession.value = "1";
    inputTimer.value = "5";
}