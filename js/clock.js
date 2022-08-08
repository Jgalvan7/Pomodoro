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
    AlarmContainer.append(AlarmInput,BtnActive,BtnDisable,BtnReset);
}
setAlarm();
const AlarmActive = document.querySelector("#setAlarm");
const AviableBtn = document.querySelector("#btnActiveAlarm");
const DisableBtn = document.querySelector("#btnDisableAlarm");
let checkHourAlarm;
function avaiableAlarm() {
    if(AlarmActive.value != "") {
        AviableBtn.disabled = true;
        DisableBtn.disabled = false;
        let alarm = AlarmActive.value.split(":");
        checkHourAlarm = setInterval(() => {
            let hourCLock = new Date();
            if(alarm[0] == hourCLock.getHours() && alarm[1] == hourCLock.getMinutes()) {
                disableAlarm();
                console.log("Alarma");
            }
        },10);
    } else {
        console.log("No hay hora establecida");
    }
}
function disableAlarm() {
    AviableBtn.disabled = false;
    DisableBtn.disabled = true;
    clearInterval(checkHourAlarm);
}
function resetAlarm() {
    AlarmActive.value = "";
    disableAlarm();
}















// Funcona para dar formato de dos digitos a la hora.
function formatValue(value) {
    return ("0" + value).slice(-2);
}