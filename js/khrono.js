const KhronoApp = document.querySelector(".app_khrono");
const ContainerDisplayKhrono = document.createElement("div");
ContainerDisplayKhrono.id = "khronoDisplay";
KhronoApp.append(ContainerDisplayKhrono);

// Display Khronos
const DisplayHours = document.createElement("span");
DisplayHours.id = "hours";
DisplayHours.textContent = formatValue(0);
const DisplayMinutes = document.createElement("span");
DisplayMinutes.id = "minutes";
DisplayMinutes.textContent = formatValue(0);
const DisplaySeconds = document.createElement("span");
DisplaySeconds.id = "seconds";
DisplaySeconds.textContent = formatValue(0);
const point = ":";
ContainerDisplayKhrono.append(DisplayHours,point,DisplayMinutes,point,DisplaySeconds);

// Controles del Khrono
const ContainerControlKhrono = document.createElement("div");
ContainerControlKhrono.id = "controlkhronoDisplay";
const BtnStart = document.createElement("button");
BtnStart.id = "btnStartKhrono";
BtnStart.textContent = "Activar";
BtnStart.disabled = false;
BtnStart.onclick = () => {
    startKhrono();
}
const BtnStop = document.createElement("button");
BtnStop.id = "btnStopKhrono";
BtnStop.textContent = "Desactivar";
BtnStop.disabled = true;
BtnStop.onclick = () => {
    stopKhrono();
}
const BtnReset = document.createElement("button");
BtnReset.id = "btnResetKhrono";
BtnReset.textContent = "Resetear";
BtnReset.disabled = true
BtnReset.onclick = () => {
    resetKhrono();
}
ContainerControlKhrono.append(BtnStart,BtnStop,BtnReset);
KhronoApp.append(ContainerControlKhrono);

// Variables para controlar los digitos del display
let hoursValue = 0;
let minutesValue = 0;
let secondsValue = 0;

function startKhrono() {
    BtnStart.disabled = true;
    BtnStop.disabled = false;
    BtnReset.disabled = false;
    countKhronos = setInterval(() => {
        secondsValue += 1;
        if(secondsValue === 60) {
            secondsValue = 0;
            minutesValue += 1;
            if(minutesValue === 60) {
                minutesValue = 0;
                hoursValue += 1;
                DisplayHours.textContent = formatValue(hoursValue);
            }
            DisplayMinutes.textContent = formatValue(minutesValue);
        }
        DisplaySeconds.textContent = formatValue(secondsValue);
    }, 1000);
}
function stopKhrono() {
    BtnStart.disabled = false;
    BtnStop.disabled = true;
    
    clearInterval(countKhronos);

}
function resetKhrono() {
    BtnReset.disabled = true;
    stopKhrono();
    secondsValue = 0;
    minutesValue = 0;
    hoursValue = 0;
    DisplayHours.textContent = formatValue(hoursValue);
    DisplayMinutes.textContent = formatValue(minutesValue);
    DisplaySeconds.textContent = formatValue(secondsValue);
}