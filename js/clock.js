const ClockApp = document.querySelector(".app_clock");
const FullTime = document.createElement("div");
FullTime.id = "clockDisplay";
ClockApp.append(FullTime);

const clockDisplayHours = document.createElement("span");
clockDisplayHours.id = "hours";
const clockDisplayMinutes = document.createElement("span");
clockDisplayMinutes.id = "minutes";
const clockDisplaySeconds = document.createElement("span");
clockDisplaySeconds.id = "seconds";
const point = ":";
FullTime.append(clockDisplayHours,point,clockDisplayMinutes,point,clockDisplaySeconds);

// Reloj
let clockDisplay = setInterval(() => {
    let timeCount = new Date();
    clockDisplayHours.textContent = formatValue(timeCount.getHours());
    clockDisplayMinutes.textContent = formatValue(timeCount.getMinutes());
    clockDisplaySeconds.textContent = formatValue(timeCount.getSeconds());
}, 10);

// Alarma
const AlarmContainer = document.createElement("div");
AlarmContainer.id = "alarmContainer";
ClockApp.append(AlarmContainer);

function setAlarm() {
    const AlarmInput = document.createElement("input");
    AlarmInput.type = "time";
    AlarmInput.id = "setAlarm";
    AlarmInput.disabled = false;
    const BtnActive = document.createElement("button");
    BtnActive.id = "btnActiveAlarm";
    BtnActive.textContent = "Activar";
    BtnActive.onclick = () => {
        avaiableAlarm();
    }
    const BtnDisable = document.createElement("button");
    BtnDisable.id = "btnDisableAlarm";
    BtnDisable.textContent = "Desactivar";
    BtnDisable.disabled = true;
    BtnDisable.onclick = () => {
        disableAlarm();
    }
    const BtnReset = document.createElement("button");
    BtnReset.id = "btnResetAlarm";
    BtnReset.textContent = "Resetear";
    BtnReset.onclick = () => {
        resetAlarm();
    }
    const BtnFiveMin = document.createElement("button");
    BtnFiveMin.id = "fiveMin";
    BtnFiveMin.disabled = true;
    BtnFiveMin.textContent = "5 minutos mas";
    BtnFiveMin.onclick = () => {
        BtnFiveMin.disabled = true;
        fiveMinMore();
    }
    /* const alarmSound = document.createElement("audio");
    alarmSound.id = "audioAlarm";
    alarmSound.className = "hidden";
    const sourceSound = document.createElement("source");
    sourceSound.type = "audio/mp3";
    sourceSound.src = "../assets/sounds/alarm_mix.mp3";
    alarmSound.append(sourceSound); */
    AlarmContainer.append(AlarmInput,BtnActive,BtnDisable,BtnReset,BtnFiveMin);
}
setAlarm();

const AlarmActive = document.querySelector("#setAlarm");
const AviableBtn = document.querySelector("#btnActiveAlarm");
const DisableBtn = document.querySelector("#btnDisableAlarm");
const BtnFiveMinMore = document.querySelector("#fiveMin");
const ActiveSound = new Audio("../assets/sounds/alarm_mix.mp3");
//const alarmSound = new Audio("../assets/sounds/alarm_mix.mp3");
let checkHourAlarm;

function avaiableAlarm() {
    AlarmActive.disabled = true;
    let seconds = 0;
    if(AlarmActive.value != "") {
        AviableBtn.disabled = true;
        DisableBtn.disabled = false;
        let alarm = AlarmActive.value.split(":");
        checkHourAlarm = setInterval(() => {
            let hourCLock = new Date();
            if(alarm[0] == hourCLock.getHours() && alarm[1] == hourCLock.getMinutes()) {
                ActiveSound.play();
                BtnFiveMinMore.disabled = false;
                seconds++;
                if(seconds >= 30){
                    disableAlarm();
                }
            }
        },1000);
    } else {
        console.log("No hay hora establecida");
        //to do validation...
    }
}
function disableAlarm() {
    AlarmActive.disabled = false;
    AviableBtn.disabled = false;
    DisableBtn.disabled = true;
    BtnFiveMinMore.disabled = true;
    ActiveSound.pause();
    ActiveSound.currentTime = 0;
    clearInterval(checkHourAlarm);
}
function resetAlarm() {
    AlarmActive.value = "";
    disableAlarm();
}
function fiveMinMore() {
    let arrayAlarm = AlarmActive.value.split(":");
    arrayAlarm[1] = formatValue(Number(arrayAlarm[1]) + 5);
    let alarmFiveMore = arrayAlarm.toString();
    AlarmActive.value = alarmFiveMore.replace(",",":");
    disableAlarm();
    avaiableAlarm();
}















// Funcona para dar formato de dos digitos a la hora.
function formatValue(value) {
    return ("0" + value).slice(-2);
}