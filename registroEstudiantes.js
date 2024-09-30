let estudiantes = []

/**
 * Busca un estudiante en el arreglo "estudiantes"
 * 
 * @param {integer} dni - DNI del estudiante que queremos buscar
 * @returns {boolean} - Retorna "true" si encontramos el dni, ademas si tiene 8 numeros y si es mayor a 0. Retorna "false" si no se encuentra
 */
function verificar(dni){
    const a = estudiantes.filter(estudiante => estudiante.dni === dni)
    return !(a.length === 1) && dni.toString().length === 8 && dni > 0
}


/**
 * Función que nos dice si un string tiene un número
 * 
 * @param {string} nombre - Nombre o Apellido que queremos verificar 
 * @returns {boolean} - Retorna "true" si el nombre contiene un número, caso contrario "false"
 */
const verificarNombreAp = (nombre) => {
    return nombre.trim() === "" || /\d/.test(nombre)
}

/**
 * Función que nos permite agregar un estudiante al arreglo
 * 
 */
const agregarEstudiante = () => {

    let apellido = prompt("Ingrese el Apellido del estudiante").toUpperCase()
    while (verificarNombreAp(apellido)){
        alert("Apellido incorrecto, ingrese un apellido correcto")
        apellido = prompt("Apellido del estudiante").toUpperCase()
    }

    let nombre = prompt("Nombre del estudiante").toUpperCase()
    while (verificarNombreAp(nombre)){
        alert("Nombre incorrecto, ingrese un nombre correcto")
        nombre = prompt("Nombre del estudiante").toUpperCase()
    }

    let dni = parseInt(prompt("DNI del estudiante"))
    while (isNaN(dni) || !verificar(dni)) {
        alert("DNI incorrecto o repetido, ingrese correctamente el dni")
        dni = parseInt(prompt("DNI del estudiante"))
    }

    let edad = parseInt(prompt("Edad del estudiante"))
    while ((edad < 0 || isNaN(edad))){
        alert("Edad incorrecta")
        edad = parseInt(prompt("Edad del estudiante"))
    }

    let dir = prompt("Ingrese la dirección del estudiante")

    let tel = parseInt(prompt("Ingrese el número de celular del alumno"))
    let lengthTel = tel.toString()
    while (lengthTel.length < 8 || isNaN(tel)){
        tel = parseInt(prompt("Ingrese el número de celular del alumno"))
        lengthTel = tel.toString()
    }

    let fechaN = prompt("Ingrese la fecha de nacimiento del alumno 'dd/mm/aaaa'")


    let alumno = new Estudiante(nombre,apellido,dir,tel,dni,fechaN,edad)
    estudiantes.push(alumno)
    alert(`El estudiante ha sido agregado correctamente!`)
    
}

/**
 * Función que nos permite eliminar un estudiante del arreglo
 * 
 * @param {integer} dni - DNI que tenemos que buscar para eliminar (ya que es único) 
 */
const eliminarEstudiante = (dni) => {
    const indice = estudiantes.indexOf(dni)
    console.log(indice)
    estudiantes.splice(indice,1)
    alert(`El estudiante ha sido eliminado correctamente`)
}

/**
 * Función que nos permite listar todos los estudiantes
 * 
 */
const listaEstudiantes = () => {
    if (estudiantes.length === 0) {
        return "No hay estudiantes para mostrar"
    }

    let mensaje = "Lista de estudiantes: \n"
    estudiantes.forEach((estudiante,index) => {
        mensaje += `${index+1}) \n Nombre: ${estudiante.getNombre} \n Apellido: ${estudiante.getApellido} \n DNI: ${estudiante.getDni} \n Edad: ${estudiante.getEdad} \n Cel: ${estudiante.getTelefono} \n Fecha Nacimiento: ${estudiante.getFechaNacimiento} \n Dirección: ${estudiante.getDireccion} \n`
    })
    return mensaje
}