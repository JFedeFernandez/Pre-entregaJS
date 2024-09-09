let dniVerificar = 0
let continuar = true

const estudiantes = []


/**
 * Busca un estudiante en el arreglo "estudiantes"
 * 
 * @param {integer} dni - DNI del estudiante que queremos buscar
 * @returns {boolean} - Retorna "true" si encontramos el dni y retorna "false" si no se encuentra
 */
const buscarEstudiante = (dni) =>  {
    let encontrado = false
    let i = 0

    while (!encontrado && i < estudiantes.length){
        if (estudiantes[i].dni === dni) {
            encontrado = true
        }
        i++
    }

    return encontrado
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
 * Función que nos dice si el dni ingresado esta correcto 
 * 
 * @param {integer} dni - DNI que queremos verificar que cumpla las condiciones
 * @returns {boolean} - Retorna "true" si el dni cumple la condicion y "false" si no la cumple
 */
function verificarDNI(dni) {
    const dniString = dni.toString()
    return dniString.length === 8 && dni > 0 && !buscarEstudiante(dni)
}

/**
 * Función que nos permite agregar un estudiante al arreglo
 * 
 */
const agregarEstudiante = () => {
    let estudiante = {
        nombre: "",
        apellido: "",
        dni: "",
        edad: ""
    }
    estudiante.apellido = prompt("Ingrese el Apellido del estudiante").toUpperCase()
    while (verificarNombreAp(estudiante.apellido)){
        alert("Apellido incorrecto, ingrese un apellido correcto")
        estudiante.apellido = prompt("Apellido del estudiante").toUpperCase()
    }
    estudiante.nombre = prompt("Ingrese el Nombre del estudiante").toUpperCase()
    while (verificarNombreAp(estudiante.nombre)){
        alert("Apellido incorrecto, ingrese un apellido correcto")
        estudiante.nombre = prompt("Nombre del estudiante").toUpperCase()
    }
    estudiante.dni = parseInt(prompt("Ingrese el DNI del estudiante"))
    while (isNaN(estudiante.dni) || !verificarDNI(estudiante.dni)) {
        alert("DNI incorrecto o repetido, ingrese correctamente el dni")
        estudiante.dni = parseInt(prompt("DNI del estudiante"))
    }
    estudiante.edad = parseInt(prompt("Ingrese la Edad del estudiante"))
    while ((estudiante.edad < 0 || isNaN(estudiante.edad))){
        alert("Edad incorrecta")
        estudiante.edad = parseInt(prompt("Edad del estudiante"))
    }

    estudiantes.push(estudiante)

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
        mensaje += `${index+1}) \n Nombre: ${estudiante.nombre} \n Apellido: ${estudiante.apellido} \n DNI: ${estudiante.dni} \n Edad: ${estudiante.edad} \n`
    })

    return mensaje
}


while (continuar) {
    let opt = prompt("\n MANEJO DE ESTUDIANTES \n 1- Agregar Estudiante. \n 2- Listar estudiantes. \n 3- Eliminar estudiante. \n 4- Salir.")
    switch (opt) {
        case '1':
            agregarEstudiante()
            break
        case '2':
            alert(listaEstudiantes())
            break
        case '3':
            verificarDNI = parseInt(prompt("Ingrese el DNI del alumno"))
            if (buscarEstudiante(verificarDNI)) {
                eliminarEstudiante(verificarDNI)
            } else {
                alert(`El DNI ingresado no existe`)
            }
            break
        case '4':
            continuar = false
            break
        default:
            alert("Opción no válida")
            continuar = false
            break
    }
}