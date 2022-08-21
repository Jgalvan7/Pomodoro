const ClockApp = document.querySelector(".app_clock");


// Title de la sección
const TitleSection = document.createElement("div");
TitleSection.id = "titleContainer";
TitleSection.className = "app_clock--title";
const TitleSectionText = document.createElement("p");
TitleSectionText.textContent = "Reloj";
TitleSection.append(TitleSectionText);
ClockApp.append(TitleSection);


// Reloj
const FullTime = document.createElement("div");
FullTime.id = "clockDisplay";
FullTime.className = "app_clock--display";
ClockApp.append(FullTime);

const clockDisplayHours = document.createElement("span");
clockDisplayHours.id = "hours";
const clockDisplayMinutes = document.createElement("span");
clockDisplayMinutes.id = "minutes";
const clockDisplaySeconds = document.createElement("span");
clockDisplaySeconds.id = "seconds";
const point = ":";
FullTime.append(clockDisplayHours,point,clockDisplayMinutes,point,clockDisplaySeconds);

let clockDisplay = setInterval(() => {
    let timeCount = new Date();
    clockDisplayHours.textContent = formatValue(timeCount.getHours());
    clockDisplayMinutes.textContent = formatValue(timeCount.getMinutes());
    clockDisplaySeconds.textContent = formatValue(timeCount.getSeconds());
}, 10);


// Alarma
const AlarmContainer = document.createElement("div");
AlarmContainer.id = "alarmContainer";
AlarmContainer.className = "app_clock--alarm";
const AlarmInput = document.createElement("input");
AlarmInput.type = "time";
AlarmInput.id = "setAlarm";
AlarmInput.className = "setAlarm";
AlarmInput.disabled = false;


// Botones
const ControlContainer = document.createElement("div");
ControlContainer.id = "btnContainer";
ControlContainer.className = "alarm_btn";
const BtnActive = document.createElement("button");
BtnActive.id = "btnActiveAlarm";
BtnActive.className = "alarm_btn--avaiable";
BtnActive.textContent = "Activar";
BtnActive.onclick = () => {
    avaiableAlarm();
}
const BtnDisable = document.createElement("button");
BtnDisable.id = "btnDisableAlarm";
BtnDisable.className = "alarm_btn--disabled";
BtnDisable.textContent = "Desactivar";
BtnDisable.disabled = true;
BtnDisable.onclick = () => {
    disableAlarm();
}
const BtnReset = document.createElement("button");
BtnReset.id = "btnResetAlarm";
BtnReset.className = "alarm_btn--reset";
BtnReset.textContent = "Resetear";
BtnReset.onclick = () => {
    resetAlarm();
}
const BtnFiveMin = document.createElement("button");
BtnFiveMin.id = "fiveMin";
BtnFiveMin.className = "alarm_btn--fiveMin hidden";
BtnFiveMin.disabled = true;
BtnFiveMin.textContent = "5 minutos mas";
BtnFiveMin.onclick = () => {
    BtnFiveMin.disabled = true;
    fiveMinMore();
}
ControlContainer.append(BtnActive,BtnDisable,BtnReset,BtnFiveMin);
AlarmContainer.append(AlarmInput,ControlContainer);
ClockApp.append(AlarmContainer);

// Sonido
const ActiveSound = new Audio("../assets/sounds/pomodoro.mp3");
let checkHourAlarm;

// Logica
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
                BtnFiveMin.classList.remove("hidden");
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
    BtnFiveMin.classList.add("hidden");
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
    BtnFiveMin.classList.add("hidden");
    disableAlarm();
    avaiableAlarm();
}

