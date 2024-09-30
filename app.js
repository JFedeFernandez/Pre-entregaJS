document.addEventListener('DOMContentLoaded', () => {

    const estudiantes = []
    const header = document.createElement('header')
    const main = document.createElement('main')
    let form = document.createElement('form')
    form.id = 'form'
    const div = document.createElement('div')

    form.classList.add('formulario')

    /**
     * Crea el header del body
     */
    const crearHeader = () => {
        const nuevoAlumno = document.createElement('button')
        const listaAlumnos = document.createElement('button')
        const eliminarAlumno = document.createElement('button')
        header.classList.add('navbar','navbar-dark','bg-dark')

        nuevoAlumno.textContent = 'Agregar Alumno'
        nuevoAlumno.id = 'nuevoAlumno'
        listaAlumnos.textContent = 'Listado de Alumnos'
        listaAlumnos.id = 'listaAlumnos'
        eliminarAlumno.textContent = 'Eliminar Alumno'
        eliminarAlumno.id = 'eliminarAlumno'

        nuevoAlumno.classList.add('btn','btn-outline-light','btn-sm','botonesHeader')
        listaAlumnos.classList.add('btn','btn-outline-light','btn-sm','botonesHeader')
        eliminarAlumno.classList.add('btn','btn-outline-light','btn-sm','botonesHeader')

        header.appendChild(nuevoAlumno)
        header.appendChild(listaAlumnos)
        header.appendChild(eliminarAlumno)
    }

    /**
     * Crea un h1 que va a ser nuestro titulo para el formulario
     * 
     * @param {String} texto - Es el titulo que va a tener nuestro formulario
     */
    const crearTitulo = (texto) => {
        const titulo = document.createElement('h1')
        titulo.textContent = texto
        form.appendChild(titulo)
    }

    /**
     * Crea un label para nuestro formulario
     * 
     * @param {String} texto - String que nos permite saber que textContent debe ir en el label.
     */
    const crearLabels = (texto) =>  {
        const label = document.createElement('label')
        label.setAttribute('for',`${texto}`)
        switch(texto) {
            case 'name':
                label.textContent = 'Nombre/s'
                break
            case 'apellido':
                label.textContent = 'Apellido/s'
                break
            case 'dni':
                label.textContent = 'DNI'
                break
            case 'edad':
                label.textContent = 'Edad'
                break
        }
        form.appendChild(label)
    }

    /**
     * Crea los input que vamos a necesitar para el estudiante
     * 
     * @param {string} type - Es el tipo que va a tener nuestro input
     * @param {string} placeholder - Texto que va dentro del input para guiarnos
     * @param {string} id - Id de nuestro input, para poder tomarlo, cuando enviamos el formulario
     * @param {string} nombre - Nombre para el input, para guiarnos
     * @param {string} title - Titulo del input
     */
    const crearInputs = (type, placeholder, id, nombre, title) => {
        const input = document.createElement('input')
        input.setAttribute('required',true)
        input.type = type
        input.placeholder = placeholder
        input.id = id
        input.name = nombre
        input.title = title
        input.style = 'text-align: center'
        form.appendChild(input)
    }

    const buscarEstudiante = (dni) => {
        const encontrado = estudiantes.filter(estudiante => estudiante.dni === dni)
        return encontrado.length === 1 && dni.toString().length === 8 && dni > 0
    }

    /**
     * 
     * @param {integer} dni - DNI del estudiante a agregar
     * @returns {boolean} - Retorna true si cumple las verificaciones, caso contrario false.
     */
    const verificarDNI = (dni) => {
        const a = estudiantes.filter(estudiante => estudiante.dni === dni)
        return !(a.length >= 1) && dni.toString().length === 8 && dni > 0
    }

    /**
     * Función que nos dice si un string tiene un número
     * 
     * @param {string} nombre - Nombre o Apellido del estudiante a verificar
     * @returns {boolean} - Retorna "true" si el nombre contiene un número, caso contrario "false"
     */
    const verificarNombre = (nombre) => {
        return nombre.trim() === "" || /\d/.test(nombre)
    }

    /**
     * Funcion que nos permite saber si los valores de los inputs estan correctamente ingresados.
     * 
     * @param {string} nombre - Nombre del alumno a registrar
     * @param {string} apellido - Apellido del alumno a registrar
     * @param {integer} dni - DNI del alumno a registrar
     * @param {integer} edad - Edad del alumno a registrar
     * @param {array} mensaje - Arreglo de string que guarda los mensajes a mostrar, por si algun valor no cumple las condiciones.
     * @returns {boolean} - Retorna "true" si el arreglo esta vacio, ya que eso significa que todos los valores son correctos, caso contrario retorna "false"
     */
    const comprobarInputs = (nombre,apellido,dni,edad,mensaje) => {
        if (verificarNombre(nombre)) {
            mensaje.push('Nombre incorrecto, ingrese nombres sin numeros')
        }
        if (verificarNombre(apellido)) {
            mensaje.push('Apellido incorrecto, ingrese nombres sin numeros')
        }
        if ((edad <= 11 && isNaN(edad))) {
            mensaje.push('Edad incorrecta, ingrese solo numeros o una edad mayor o igual a 11')
        }
        if (!verificarDNI(dni)) {
            mensaje.push('DNI incorrecto o repetido')
        }

        return mensaje.length > 0
    }

    /**
     * Funcion que crea los botones "Aceptar" y "Cancelar" del formulario.
     * 
     * @param {string} nombre - Nombre que le vamos a dar a los botones del formulario. 
     */
    const crearBotones = (nombre) => {
        const boton = document.createElement('button')
        boton.textContent = nombre
        boton.type = 'submit'
        if (nombre === 'Cancelar') {
            boton.id = 'cancelar'
            boton.classList.add('btn','btn-danger','btnSubmit')
        } else {
            boton.id = 'aceptar'
            boton.classList.add('btn','btn-primary','btnSubmit')
        }
        div.appendChild(boton)
        form.appendChild(div)
    }

    /**
     * Funcion que carga todos los datos del storage al arreglo "estudiantes"
     */
    const cargarArray = () => {

        let i = 0
        while (i < localStorage.length){
            const objeto = JSON.parse(localStorage.getItem(i.toString()))
            estudiantes.push(objeto)
            i++
        }

    }

    /**
     * Función que guarda un objeto 'alumno' en el localStorage
     * Solo en el caso de que haya pasado las verificaciones de la funcion "comprobarInputs"
     * 
     * @param {object} alumno - Es un objeto de la clase Estudiante.
     */
    const cargarStorage = (alumno) => {
        
        if (localStorage.length === 0) {
            localStorage.setItem(`${localStorage.length}`,JSON.stringify(alumno))
        } else {
            const i = localStorage.length
            localStorage.setItem(`${i}`,JSON.stringify(alumno))
        }

    }

    /**
     * Función que procesa el formulario cuando se envía
     * 
     * @param {event} e - representa el evento de envío del formulario
     */
    const procesarFormulario = (e) => {

        e.preventDefault()
        const formulario = document.getElementById('form')
        let mensaje = []
        const uls = document.querySelectorAll('ul')

        if (uls.length === 1){
            uls.forEach(e => {
                e.remove()
            });
        }

        const ul = document.createElement('ul')
        const nombre = document.getElementById('name').value
        const apellido = document.getElementById('apellido').value
        const dni = document.getElementById('dni').value
        const edad = document.getElementById('edad').value
        
        if (comprobarInputs(nombre,apellido,dni,edad,mensaje)){
            mensaje.forEach(e => {
                const li = document.createElement('li')
                li.style = 'Color: red;list-style: none;'
                li.textContent = e
                ul.appendChild(li)
            });
        } else {
            const alumno = new Estudiante(nombre,apellido,dni,edad)
            estudiantes.push(alumno)
            cargarStorage(alumno)

            const forms = document.querySelectorAll('form')
            if (forms.length === 1) {
                forms.forEach(element => {
                    element.remove()
                });
            }
            const li = document.createElement('li')
            li.style = 'Color: Green; list-style: none;'
            li.textContent = 'Alumno agregado correctamente!'
            ul.appendChild(li)
        }
        main.appendChild(ul)

    }

    /**
     * Función que cancela el formulario eliminando todos los formularios y listas desordenadas (ul) en la página
     */
    const cancelarFormulario = () => {
        const forms = document.querySelectorAll('form')
        const uls = document.querySelectorAll('ul')
        uls.forEach(element => {
            element.remove()
        });
        forms.forEach(element => {
            element.remove()
        });
    }

    /**
    * Carga un formulario que permite agregar un nuevo estudiante.
    * Incluye campos de Nombre, Apellido, DNI, Edad y botones de Aceptar/Cancelar.
    */
    const cargarFormulario = () => {
        form.innerHTML = ''
        div.innerHTML = ''
        main.innerHTML = ''

        crearTitulo('Registro de Alumnos')
        crearLabels('apellido')
        crearInputs('text','Apellido','apellido','apellido','')
        crearLabels('name')
        crearInputs('text','Nombre Completo','name','name','')
        crearLabels('dni')
        crearInputs('number','Ej: 13125144','dni','dni','Debe ingresar un DNI de 8 dígitos')
        crearLabels('edad')
        crearInputs('number','Ej: 25','edad','edad','Ingrese una edad entre 0 y 90')
        crearBotones('Aceptar')
        crearBotones('Cancelar')
        main.appendChild(form)

        const btnAceptar = document.getElementById('aceptar')
        const btnCancelar = document.getElementById('cancelar')
        
        btnAceptar.addEventListener('click',procesarFormulario)
        btnCancelar.addEventListener('click',cancelarFormulario)
    }

    const buscarIndice = (dni) => {
        for(i = 0; i < estudiantes.length; i++){
            if (estudiantes[i].dni === dni) return i
        }
    }

    /**
     * Carga un formulario para ingresar el DNI del alumno a eliminar.
     * Verifica si el alumno existe y lo elimina del array y del localStorage.
     * 
     * @param {*} e - Evento que activa la función de eliminación de alumno. 
     */
    const eliminarAlumno = (e) => {
        e.preventDefault()
        form.innerHTML = ''
        div.innerHTML = ''
        main.innerHTML = ''


        crearTitulo('Eliminar Alumno')
        crearLabels('dni')
        crearInputs('number','Ej: 13125144','dni','dni','Debe ingresar un DNI de 8 dígitos')

        crearBotones('Aceptar')
        crearBotones('Cancelar')

        main.appendChild(form)

        const btnAceptar = document.getElementById('aceptar')
        const btnCancelar = document.getElementById('cancelar')

        btnAceptar.addEventListener('click', (e) => {
            e.preventDefault()
            const dni = document.getElementById('dni').value
            if (buscarEstudiante(dni)){
                form.innerHTML = ''
                div.innerHTML = ''
                main.innerHTML = ''
        
                const alumno = estudiantes.filter(estudiante => estudiante.dni === dni)
                const ul = document.createElement('ul')
                const li = document.createElement('li')
                const indice = buscarIndice(dni)

                alumno.forEach(alumno => {
                    li.textContent = `Alumno ${alumno.apellido} ${alumno.nombre} eliminado correctamente`
                    li.style = 'color: green'
                });

                localStorage.clear()
                estudiantes.splice(indice,1)
                estudiantes.forEach(element => {
                    cargarStorage(element)
                });

                ul.appendChild(li)
                main.appendChild(ul)
            } else {
                form.innerHTML = ''
                div.innerHTML = ''
                main.innerHTML = ''
                const ul = document.createElement('ul')
                const li = document.createElement('li')
                li.textContent = `No hay ningun alumno con el DNI: ${dni}`
                li.style = 'color: red'
                ul.appendChild(li)
                main.appendChild(ul)
            }
        })

        btnCancelar.addEventListener('click',cancelarFormulario)
    }


    /**
     * Crea y muestra la lista de estudiantes en el DOM.
     * 
     * Esta función genera una tabla con todos los estudiantes almacenados y la muestra en el elemento <main>.
     */
    const listaAlumnos = () => {
        form.innerHTML = ''
        div.innerHTML = ''
        main.innerHTML = ''
        const table = document.createElement('table')
        const tituloTh1 = document.createElement('th')
        const tituloTh2 = document.createElement('th')
        const tituloTh3 = document.createElement('th')
        const tituloTh4 = document.createElement('th')
        tituloTh1.textContent = 'DNI'
        tituloTh2.textContent = 'Apellido'
        tituloTh3.textContent = 'Nombre'
        tituloTh4.textContent = 'Edad'
        table.appendChild(tituloTh1)
        table.appendChild(tituloTh2)
        table.appendChild(tituloTh3)
        table.appendChild(tituloTh4)
        estudiantes.forEach(element => {
            const fila = document.createElement('tr')
            const columna1 = document.createElement('td')
            const columna2 = document.createElement('td')
            const columna3 = document.createElement('td')
            const columna4 = document.createElement('td')
            columna1.textContent = element.dni
            columna2.textContent = element.apellido
            columna3.textContent = element.nombre
            columna4.textContent = element.edad
            fila.appendChild(columna1)
            fila.appendChild(columna2)
            fila.appendChild(columna3)
            fila.appendChild(columna4)
            table.appendChild(fila)
        });
        main.appendChild(table)
    }

    cargarArray()
    crearHeader()

    document.body.append(header,main)
    const btnNuevoAlumno = document.getElementById('nuevoAlumno')
    btnNuevoAlumno.addEventListener('click',cargarFormulario)
    const btnListadoAlumnos = document.getElementById('listaAlumnos')
    btnListadoAlumnos.addEventListener('click',listaAlumnos)
    const btnEliminarAlumno = document.getElementById('eliminarAlumno')
    btnEliminarAlumno.addEventListener('click',eliminarAlumno)
    
})
