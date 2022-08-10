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
AlarmContainer.append(AlarmInput,BtnActive,BtnDisable,BtnReset,BtnFiveMin);

const ActiveSound = new Audio("../assets/sounds/alarm_mix.mp3");
let checkHourAlarm;

function avaiableAlarm() {
    AlarmInput.disabled = true;
    let seconds = 0;
    if(AlarmInput.value != "") {
        BtnActive.disabled = true;
        BtnDisable.disabled = false;
        let alarm = AlarmInput.value.split(":");
        checkHourAlarm = setInterval(() => {
            let hourCLock = new Date();
            if(alarm[0] == hourCLock.getHours() && alarm[1] == hourCLock.getMinutes()) {
                ActiveSound.play();
                BtnFiveMin.disabled = false;
                seconds++;
                if(seconds >= 30){
                    disableAlarm();
                }
            }
        },1000);
    } else {
        console.log("No hay hora establecida");
        AlarmInput.disabled = false;
        //to do validation...
    }
}
function disableAlarm() {
    AlarmInput.disabled = false;
    BtnActive.disabled = false;
    BtnDisable.disabled = true;
    BtnFiveMin.disabled = true;
    ActiveSound.pause();
    ActiveSound.currentTime = 0;
    clearInterval(checkHourAlarm);
}
function resetAlarm() {
    AlarmInput.value = "";
    disableAlarm();
}
function fiveMinMore() {
    let arrayAlarm = AlarmInput.value.split(":");
    arrayAlarm[1] = formatValue(Number(arrayAlarm[1]) + 5);
    let alarmFiveMore = arrayAlarm.toString();
    AlarmInput.value = alarmFiveMore.replace(",",":");
    disableAlarm();
    avaiableAlarm();
}















