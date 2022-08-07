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
AlarmContainer.addEventListener("click", (event) => {
    if(event.target.id == "setAlarm") {
        hourAlarm = event.target.value;
        if(hourAlarm != "") {
            avaiableAlarm();
        }
    }
});


function setAlarm() {
    let alarmInput = document.createElement("input");
    alarmInput.type = "time";
    alarmInput.id = "setAlarm";
    let btnActive = document.createElement("button");
    btnActive.id = "btnActiveAlarm";
    btnActive.textContent = "Activar";
    let btnDisable = document.createElement("button");
    btnDisable.id = "btnDisableAlarm";
    btnDisable.textContent = "Desactivar";
    let btnReset = document.createElement("button");
    btnReset.id = "btnResetAlarm";
    btnReset.textContent = "Resetear";
    btnReset.onclick = () => {
        resetAlarm();
    };
    AlarmContainer.append(alarmInput,btnActive,btnDisable,btnReset);
}
setAlarm();
const AlarmActive = document.querySelector("#setAlarm");
function avaiableAlarm() {
    console.log("Alarma Activa");
}
function disableAlarm() {
}
function resetAlarm() {
    AlarmActive.value = "";
}















// Funcona para dar formato de dos digitos a la hora.
function formatValue(value) {
    return ("0" + value).slice(-2);
}