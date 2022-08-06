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
    let alarmInput = document.createElement("input");
    alarmInput.type = "time";
    alarmInput.id = "setAlarm";
    AlarmContainer.append(alarmInput);
}
setAlarm();

function avaiableAlarm() {
    
}















// Funcona para dar formato de dos digitos a la hora.
function formatValue(value) {
    return ("0" + value).slice(-2);
}