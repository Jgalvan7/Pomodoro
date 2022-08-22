const PomodoroApp = document.querySelector(".app_pomodoro");


// Title de la sección
const TitleSection = document.createElement("div");
TitleSection.id = "titleContainer";
TitleSection.className = "app_clock--title";
const TitleSectionText = document.createElement("p");
TitleSectionText.textContent = "Pomodoro";
TitleSection.append(TitleSectionText);
PomodoroApp.append(TitleSection);


// Contenedores
const PomodoroTimer = document.createElement("div");
PomodoroTimer.id = "pomodoroTimer";
PomodoroTimer.className = "app_pomodoro--display";
const PomodoroConfig = document.createElement("div");
PomodoroConfig.id = "pomodoroConfig";
PomodoroConfig.className = "app_pomodoro--constrols";
PomodoroApp.append(PomodoroTimer,PomodoroConfig);


// Display
const DisplayMinutes = document.createElement("span");
DisplayMinutes.id = "minutes";
DisplayMinutes.textContent = formatValue(0);
const DisplaySeconds = document.createElement("span");
DisplaySeconds.id = "seconds";
DisplaySeconds.textContent = formatValue(0);
const point = ":";
PomodoroTimer.append(DisplayMinutes,point,DisplaySeconds);


// Controles
const PomodoroConfigContentInput = document.createElement("div");
PomodoroConfigContentInput.id = "ConfigInputContainer";
PomodoroConfigContentInput.className = "pomodoroConfigValue";
const PomodoroConfigContentBtn = document.createElement("div");
PomodoroConfigContentBtn.id = "ConfigBtnContainer";
PomodoroConfigContentBtn.className = "pomodoroConfigBtn";
PomodoroConfig.append(PomodoroConfigContentInput,PomodoroConfigContentBtn);


// Configuración de la sessión
const spanSession = document.createElement("div");
spanSession.className = "containerControl";
const textSession = document.createElement("p");
textSession.textContent = "Session: ";
const containerSession = document.createElement("div");
containerSession.className = "containerSession";
const LessSession= document.createElement("button");
LessSession.id = "amountSession";
LessSession.textContent = "-";
LessSession.disabled = true;
LessSession.onclick = () => {
    fewerSession();
}
let sessionValue = document.createElement("span");
sessionValue.id = "amountSession";
sessionValue.textContent = "1";
const PlusSession = document.createElement("button");
PlusSession.id = "amountSession";
PlusSession.textContent = "+";
PlusSession.onclick = () => {
    moreSession();
}
containerSession.append(LessSession,sessionValue,PlusSession);
const spanTimer = document.createElement("div");
spanTimer.className = "containerControl";
const textTimer = document.createElement("p");
textTimer.textContent = "Tiempo: ";
const containerTimer = document.createElement("div");
containerTimer.className = "containerSession";
const LessTimer= document.createElement("button");
LessTimer.id = "amountSession";
LessTimer.textContent = "-";
LessTimer.disabled = true;
LessTimer.onclick = () => {
    fewerTimer();
}
let timerValue = document.createElement("span");
timerValue.id = "amountSession";
timerValue.textContent = "5";
const PlusTimer = document.createElement("button");
PlusTimer.id = "amountSession";
PlusTimer.textContent = "+";
PlusTimer.onclick = () => {
    moreTimer();
}
containerTimer.append(LessTimer,timerValue,PlusTimer);
spanSession.append(textSession,containerSession);
spanTimer.append(textTimer,containerTimer);
PomodoroConfigContentInput.append(spanSession,spanTimer);


// Botones de control
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


// Sonido y variables
const ActiveSound = new Audio("../assets/sounds/pomodoro.mp3");
let countPomodoro;
let minutesValue = 0;
let secondsValue = 0;
let sessionEtapas = Number(sessionValue.textContent);
let timerSession = Number(timerValue.textContent);
const etapas = 0;


// Lógica y programación
function moreSession() {
    sessionValue.textContent = Number(sessionValue.textContent) + 1;
    sessionEtapas = Number(sessionValue.textContent);
    LessSession.disabled = false;
}
function fewerSession() {
    sessionValue.textContent = Number(sessionValue.textContent) - 1;
    sessionEtapas = Number(sessionValue.textContent);
    if (sessionEtapas == 1) {
        LessSession.disabled = true;
    }
}
function moreTimer() {
    timerValue.textContent = Number(timerValue.textContent) + 5;
    timerSession = Number(timerValue.textContent);
    LessTimer.disabled = false;
}
function fewerTimer() {
    timerValue.textContent = Number(timerValue.textContent) - 5;
    timerSession = Number(timerValue.textContent);
    if (timerSession == 5) {
        LessTimer.disabled = true;
    }
}
function startTimer() {
    BtnStart.disabled = true;
    BtnStop.disabled = false;
    LessSession.disabled = true;
    PlusSession.disabled = true;
    LessTimer.disabled = true;
    PlusTimer.disabled = true;
    minutesValue = timerSession;
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
    sessionValue.textContent -= 1;
    sessionEtapas = sessionValue.textContent;
    if(sessionEtapas == etapas) {
        resetPomodoro(countPomodoro);
        return;
    } else {
        let delay;
        if(timerSession <= 30){
            delay = 1000*30;
        } else {
            delay = 1000*600;
        };
        const pause = setTimeout(() => {
            minutesValue = timerSession;
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
    minutesValue = timerSession;
    BtnStart.disabled = false;
    BtnStop.disabled = true;
    LessSession.disabled = false;
    PlusSession.disabled = false;
    LessTimer.disabled = false;
    PlusTimer.disabled = false;
}
function resetPomodoro(countName) {
    stopTimer(countName);
    sessionValue.textContent = "1";
    timerValue.textContent = "5";
}