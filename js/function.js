// Función para dar formato de dos digitos a la hora.
function formatValue(value) {
    return ("0" + value).slice(-2);
}

// Función para agregar o quitar clases a las etiquetas
function addRemoveClass(etiqueta, clase) {
    etiqueta.classList.contains(clase) ? etiqueta.classList.remove(clase) : etiqueta.classList.add(clase);
}