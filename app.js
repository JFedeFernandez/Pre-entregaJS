import { Estudiante } from "./Estudiante.js"

const estudiantes = JSON.parse(localStorage.getItem('estudiantes')) || []

/**
 * Muestra una alerta de éxito cuando se ha agregado un alumno correctamente.
 */
const alertCompletado = () => {
    Swal.fire({
        title: "Alumno agregado correctamente!",
        text: "Has click en el boton para continuar!",
        icon: "success"
    });
}

/**
 * Muestra una alerta de error con una lista de mensajes proporcionados.
 * @param {Array} msjArray - Array de mensajes que se mostrarán en la alerta.
 */
const alertEditableList = (msjArray) => {
    let texto = ''
    msjArray.forEach(e => {
        texto += `${e} \n`
    })
    Swal.fire({
        icon: "error",
        title: "Oops...",
        html: `<div style="color: red;">${texto.replace(/\n/g, '<br>')}</div>`
    });
}

/**
 * Crea un label para nuestro formulario
 * 
 * @param {String} texto - String que nos permite saber que textContent debe ir en el label.
 */
const crearLabel = (forr, content, form) => {
    const label = document.createElement('label')
    label.setAttribute('for', forr)
    label.textContent = content
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
const crearInputs = (type, placeholder, id, nombre, title, form) => {
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

/**
 * Funcion que crea los botones "Aceptar" y "Cancelar" del formulario.
 * 
 * @param {string} nombre - Nombre que le vamos a dar a los botones del formulario. 
 */
const crearBotones = (nombre, form, div) => {
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
 * 
 * @param {integer} dni - DNI del estudiante a agregar
 * @returns {boolean} - Retorna true si cumple las verificaciones, caso contrario false.
 */
const verificarDNI = (dni, ar) => {
    const a = ar.filter(estudiante => estudiante._dni === dni)
    
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
 * Función que agrega un nuevo estudiante al array de estudiantes y lo almacena en el localStorage
 * 
 * @param {Object} param - Objeto con los datos del estudiante
 * @param {string} param.apellido - Apellido del estudiante
 * @param {string} param.nombre - Nombre del estudiante
 * @param {number} param.edad - Edad del estudiante
 * @param {string} param.dni - DNI del estudiante
 */
const agregarAlumno = ({apellido, nombre, edad, dni}) => {
    const nuevoAlumno = new Estudiante(apellido, nombre, edad, dni)
    estudiantes.push(nuevoAlumno)
    localStorage.setItem('estudiantes', JSON.stringify(estudiantes))
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
const comprobarInputs = (nombre,apellido,dni,edad,mensaje,ar) => {
    if (verificarNombre(nombre)) {
        mensaje.push('Nombre incorrecto, ingrese nombres sin numeros')
    }
    if (verificarNombre(apellido)) {
        mensaje.push('Apellido incorrecto, ingrese nombres sin numeros')
    }
    if ((edad <= 11 && !isNaN(edad))) {
        mensaje.push('Edad incorrecta, ingrese solo numeros o una edad mayor o igual a 11')
    }
    if (!verificarDNI(dni,ar)) {
        mensaje.push('DNI incorrecto o repetido')
    }

    return mensaje.length > 0
}

/**
 * Función que guarda un objeto 'alumno' en el localStorage
 * Solo en el caso de que haya pasado las verificaciones de la funcion "comprobarInputs"
 */
const cargarStorage = () => {
    localStorage.setItem('estudiantes',JSON.stringify(estudiantes))
}

/**
 * Función que procesa el formulario cuando se envía
 * 
 * @param {event} e - representa el evento de envío del formulario
 */
const procesarFormulario = (e) => {
    const main = document.querySelector('main')
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

    //Comprobacion de los datos, si hay datos invalidos, entra al 'if', caso contrario 'else'
    if (comprobarInputs(nombre,apellido,dni,edad,mensaje,estudiantes)){
        alertEditableList(mensaje)
    } else {
        const alumno = new Estudiante(apellido,nombre,Number(edad),dni)
        estudiantes.push(alumno)
        cargarStorage()

        const forms = document.querySelectorAll('form')
        if (forms.length === 1) {
            forms.forEach(element => {
                element.remove()
            });
        }
        alertCompletado()
    }
}

/**
 * Función que crea y carga un formulario dinámicamente en el elemento 'main' de la página
 * El formulario contiene campos para ingresar apellido, nombre, DNI y edad
 * junto con botones de 'Aceptar' y 'Cancelar'.
 */
const cargarFormulario = () => {

    //Cracion de form
    const form = document.createElement('form')
    form.className = 'formulario'
    form.id = 'form'

    //Div para los botones
    const div = document.createElement('div')

    //Main para agregar las etiquetas dentro
    const main = document.querySelector('main')
    main.innerHTML =''

    //Creacion de labels, inputs y botones
    crearLabel('apellido','Apellido/s',form)
    crearInputs('text','Apellido','apellido','apellido','',form)
    crearLabel('name','Nombre/s',form)
    crearInputs('text','Nombre Completo','name','name','',form)
    crearLabel('dni','DNI',form)
    crearInputs('number','Ej: 13125144','dni','dni','Debe ingresar un DNI de 8 dígitos',form)
    crearLabel('edad','Edad',form)
    crearInputs('number','Ej: 25','edad','edad','Ingrese una edad entre 0 y 90',form)
    crearBotones('Aceptar',form,div)
    crearBotones('Cancelar',form,div)

    main.appendChild(form)
}

/**
 * Muestra una alerta de confirmación antes de modificar los datos de un alumno.
 * Si el usuario confirma, se procede a guardar los cambios en el almacenamiento local.
 */
const alertEditar = () => {
    Swal.fire({
        title: "Estas seguro que lo deseas modificar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, modificalo!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Modificado!",
                text: "El alumno ha sido modificado.",
                icon: "success"
            });
            cargarStorage()
            const main = document.querySelector('main')
            main.innerHTML = ''
        }
    });
}

/**
 * Función que permite editar un alumno existente al hacer clic en el botón 'Editar'
 * La función carga el formulario con los datos del alumno seleccionado y actualiza los datos tras confirmar la edición.
 */
const editarAlumno = () => {

    const btns = document.querySelectorAll('button')
    btns.forEach(element => {
        if (element.innerText === 'Editar'){
            element.addEventListener('click', () => {
                const alumno = estudiantes[element.id]
                cargarFormulario(element.id)
                
                const apellido = document.getElementById('apellido')
                apellido.value = alumno._apellido
                
                const nombre = document.getElementById('name')
                nombre.value = alumno._nombre

                const dni = document.getElementById('dni')
                dni.value = alumno._dni

                const edad = document.getElementById('edad')
                edad.value = alumno._edad

                //Confirmamos la edicion del alumno correspondiente
                const btnAceptar = document.getElementById('aceptar')
                btnAceptar.addEventListener('click', (e) => {

                    let msj = []
                    const copyArray = []
                    estudiantes.forEach(estudiante => {
                        copyArray.push(estudiante)
                    })
                    copyArray.splice(element.id,1)

                    //Comprobacion de los nuevos datos, si hay datos invalidos, entra al 'if', caso contrario 'else'
                    if (comprobarInputs(nombre.value,apellido.value,dni.value,edad.value,msj,copyArray)){
                        alertEditableList(msj)
                        const main = document.querySelector('main')
                        main.innerHTML = ''
                    } else {
                        alumno._apellido = apellido.value.toUpperCase()
                        alumno._nombre = nombre.value.toUpperCase()
                        alumno._edad = edad.value
                        alumno._dni = dni.value
                        e.preventDefault()
                        alertEditar()
                    }
                })

                const btnCancelar = document.getElementById('cancelar')
                btnCancelar.addEventListener('click', () => {
                    const main = document.querySelector('main')
                    main.innerHTML = ''
                })
            })
        }
    })
}

/**
 * Muestra una alerta de confirmación antes de eliminar un alumno.
 * Si el usuario confirma, el alumno es eliminado del array 'estudiantes' y se actualiza el almacenamiento local.
 *
 * @param {number} id - El índice del alumno en el array 'estudiantes' que se desea eliminar.
 */
const alertEliminar = (id) => {
    Swal.fire({
        title: "Estas seguro que lo deseas eliminar?",
        text: "Si lo eliminas no podras volver atras!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminalo!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Eliminado!",
                text: "El alumno ha sido eliminado.",
                icon: "success"
            });
            estudiantes.splice(id,1)
            cargarStorage()
                
            const main = document.querySelector('main')
            main.innerHTML = ''
        }
    });
}

/**
 * Función que agrega eventos de eliminación a los botones correspondientes y elimina un alumno del array.
 * Al hacer clic en un botón "Eliminar", elimina el alumno, actualiza el localStorage y muestra un mensaje de confirmación.
 */
const eliminarAlumno = () => {
    const btns = document.querySelectorAll('button')
    btns.forEach(element => {
        if (element.innerText === 'Eliminar'){
            element.addEventListener('click', () => {

                alertEliminar(element.id)

            })
        }
    })
}

/**
 * Ordena la tabla de estudiantes según la columna seleccionada (apellido, nombre, dni o edad)
 * 
 * @param {Event} e - El evento generado al hacer click en un botón o elemento para ordenar
 */
const ordenar = (e) => {
    const main = document.querySelector('main')

    const table = document.querySelector('table')
    table.innerHTML = ''

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

    switch (e.target.id){
        case 'apellido':
            const ordenadosPorAp = estudiantes.slice().sort((a, b) => {
                const nombreA = a._apellido.toLowerCase();
                const nombreB = b._apellido.toLowerCase();
                
                if (nombreA < nombreB) return -1;
                if (nombreA > nombreB) return 1;
                return 0;
            });

            ordenadosPorAp.forEach(element => {
                const fila = document.createElement('tr')
                const columna1 = document.createElement('td')
                const columna2 = document.createElement('td')
                const columna3 = document.createElement('td')
                const columna4 = document.createElement('td')
                columna1.textContent = element._dni
                columna2.textContent = element._apellido
                columna3.textContent = element._nombre
                columna4.textContent = element._edad
                fila.appendChild(columna1)
                fila.appendChild(columna2)
                fila.appendChild(columna3)
                fila.appendChild(columna4)
                table.appendChild(fila)
            })
            main.appendChild(table)
            break
        case 'nombre':
            const ordenadosPorNom = estudiantes.slice().sort((a, b) => {
                const nombreA = a._nombre.toLowerCase();
                const nombreB = b._nombre.toLowerCase();
                
                if (nombreA < nombreB) return -1;
                if (nombreA > nombreB) return 1;
                return 0;
            });

            ordenadosPorNom.forEach(element => {
                const fila = document.createElement('tr')
                const columna1 = document.createElement('td')
                const columna2 = document.createElement('td')
                const columna3 = document.createElement('td')
                const columna4 = document.createElement('td')
                columna1.textContent = element._dni
                columna2.textContent = element._apellido
                columna3.textContent = element._nombre
                columna4.textContent = element._edad
                fila.appendChild(columna1)
                fila.appendChild(columna2)
                fila.appendChild(columna3)
                fila.appendChild(columna4)
                table.appendChild(fila)
            })
            main.appendChild(table)
            break
        case 'dni':
            const ordenadosPorDni = estudiantes.slice().sort((a, b) => {
                const nombreA = parseInt(a._dni);
                const nombreB = parseInt(b._dni);
                
                if (nombreA < nombreB) return -1;
                if (nombreA > nombreB) return 1;
                return 0;
            });

            ordenadosPorDni.forEach(element => {
                const fila = document.createElement('tr')
                const columna1 = document.createElement('td')
                const columna2 = document.createElement('td')
                const columna3 = document.createElement('td')
                const columna4 = document.createElement('td')
                columna1.textContent = element._dni
                columna2.textContent = element._apellido
                columna3.textContent = element._nombre
                columna4.textContent = element._edad
                fila.appendChild(columna1)
                fila.appendChild(columna2)
                fila.appendChild(columna3)
                fila.appendChild(columna4)
                table.appendChild(fila)
            })
            main.appendChild(table)
            break
        case 'edad':
            const ordenadosPorEdad = estudiantes.slice().sort((a, b) => {
                const nombreA = a._edad;
                const nombreB = b._edad;
                
                if (nombreA < nombreB) return -1;
                if (nombreA > nombreB) return 1;
                return 0;
            });

            ordenadosPorEdad.forEach(element => {
                const fila = document.createElement('tr')
                const columna1 = document.createElement('td')
                const columna2 = document.createElement('td')
                const columna3 = document.createElement('td')
                const columna4 = document.createElement('td')
                columna1.textContent = element._dni
                columna2.textContent = element._apellido
                columna3.textContent = element._nombre
                columna4.textContent = element._edad
                fila.appendChild(columna1)
                fila.appendChild(columna2)
                fila.appendChild(columna3)
                fila.appendChild(columna4)
                table.appendChild(fila)
            })
            main.appendChild(table)
            break
    }
}


/**
 * Función que carga el contenido dinámico de la interfaz de usuario, como la creación, edición,
 * eliminación y listado de alumnos mediante eventos sobre botones.
 */
const cargaDOM = () => {

    // Evento para agregar un Nuevo Alumno
    const btnNuevoAlumno = document.getElementById('nuevoAlumno')
    
    btnNuevoAlumno.addEventListener('click', () => {
        const main = document.querySelector('main')
        main.innerHTML = ''

        const form = document.createElement('form')
        form.className = 'formulario'
        form.id = 'form'

        const titulo = document.createElement('h1')
        titulo.textContent = 'Registro Nuevo Alumno'
        form.appendChild(titulo)

        crearLabel('apellido','Apellido/s',form)
        crearInputs('text','Apellido Completo','apellido','apellido','',form)
        crearLabel('name','Nombre/s',form)
        crearInputs('text','Nombre Completo','name','name','',form)
        crearLabel('edad','Edad',form)
        crearInputs('number','Ej: 25','edad','edad','Ingrese una edad entre 0 y 90',form)
        crearLabel('dni','DNI',form)
        crearInputs('number','Ej: 13125144','dni','dni','Debe ingresar un DNI de 8 dígitos',form)

        const div = document.createElement('div')
        crearBotones('Aceptar',form,div)
        crearBotones('Cancelar',form,div)

        main.appendChild(form)

        const btnAceptar = document.getElementById('aceptar')
        btnAceptar.addEventListener('click', procesarFormulario)

        const btnCancelar = document.getElementById('cancelar')
        btnCancelar.addEventListener('click', () => {
            main.innerHTML = ''
        })
    })

    // Evento para editar un alumno
    const btnEditarAlumno = document.getElementById('editarAlumno')

    btnEditarAlumno.addEventListener('click', (e) => {
        e.preventDefault()
        const main = document.querySelector('main')
        main.innerHTML = ''
    
        //Navegador de busqueda
        const buscador = document.createElement('input')
        buscador.id = 'buscador'
        buscador.className = 'buscadorLista'
        buscador.placeholder = 'Buscar..'

        const barraBuscadora = document.createElement('div')
        barraBuscadora.className = 'buscador'

        barraBuscadora.appendChild(buscador)
        
        main.appendChild(barraBuscadora)

        const table = document.createElement('table')
        const tituloTh1 = document.createElement('th')
        const tituloTh2 = document.createElement('th')
        const tituloTh3 = document.createElement('th')
        const tituloTh4 = document.createElement('th')
        const tituloTh5 = document.createElement('th')
        tituloTh1.textContent = 'DNI'
        tituloTh2.textContent = 'Apellido'
        tituloTh3.textContent = 'Nombre'
        tituloTh4.textContent = 'Edad'
        tituloTh5.textContent = ''
        table.appendChild(tituloTh1)
        table.appendChild(tituloTh2)
        table.appendChild(tituloTh3)
        table.appendChild(tituloTh4)
        table.appendChild(tituloTh5)

        estudiantes.forEach((element, index) => {
            const fila = document.createElement('tr')
            const columna1 = document.createElement('td')
            const columna2 = document.createElement('td')
            const columna3 = document.createElement('td')
            const columna4 = document.createElement('td')
            const columna5 = document.createElement('td')
            const btnEditar = document.createElement('button')
            btnEditar.id = `${index}`
            btnEditar.textContent = 'Editar'
            btnEditar.classList.add('btn','btn-primary','btn-sm')
            columna1.textContent = element._dni
            columna2.textContent = element._apellido
            columna3.textContent = element._nombre
            columna4.textContent = element._edad
            columna5.appendChild(btnEditar)
            fila.appendChild(columna1)
            fila.appendChild(columna2)
            fila.appendChild(columna3)
            fila.appendChild(columna4)
            fila.appendChild(columna5)
            table.appendChild(fila)
        })

        main.appendChild(table)

        editarAlumno()

        function renderTable(estudiantes) {
            // Limpiar las filas actuales de la tabla
            const filas = document.querySelectorAll('tr');
            filas.forEach((fila, index) => {
                if (index >= 0) fila.remove(); // No borrar la fila de los encabezados
            });
        
            // Añadir filas para cada estudiante
            estudiantes.forEach((element) => {
                const fila = document.createElement('tr');
                const columna1 = document.createElement('td');
                const columna2 = document.createElement('td');
                const columna3 = document.createElement('td');
                const columna4 = document.createElement('td');
                const columna5 = document.createElement('td')
                const btnEditar = document.createElement('button')
                btnEditar.id = `${element.index}`
                btnEditar.textContent = 'Editar'
                btnEditar.classList.add('btn','btn-primary','btn-sm')
                columna1.textContent = element.estudiante._dni;
                columna2.textContent = element.estudiante._apellido;
                columna3.textContent = element.estudiante._nombre;
                columna4.textContent = element.estudiante._edad;
                columna5.appendChild(btnEditar)
                fila.appendChild(columna1);
                fila.appendChild(columna2);
                fila.appendChild(columna3);
                fila.appendChild(columna4);
                fila.appendChild(columna5)
                table.appendChild(fila);
            });
            editarAlumno()
        }

        buscador.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toUpperCase();

            const filteredNEstudiantes = estudiantes.map((estudiante, index) => {
                if (
                    estudiante._dni.toString() === searchTerm ||
                    estudiante._apellido.toUpperCase().includes(searchTerm.toUpperCase()) ||
                    estudiante._nombre.toUpperCase().includes(searchTerm.toUpperCase()) ||
                    estudiante._edad.toString().includes(searchTerm)
                ) {
                    return { estudiante, index }; // Retorna un objeto con el estudiante y su índice
                }
                return null; // Si no cumple, devuelve null
            })
            .filter(item => item !== null);

            renderTable(filteredNEstudiantes)
        });
    })

    // Evento para eliminar un alumno
    const btnEliminarAlumno = document.getElementById('eliminarAlumno')

    btnEliminarAlumno.addEventListener('click', (e) => {
        e.preventDefault()
        const main = document.querySelector('main')
        main.innerHTML = ''

        //Navegador de busqueda
        const buscador = document.createElement('input')
        buscador.id = 'buscador'
        buscador.className = 'buscadorLista'
        buscador.placeholder = 'Buscar..'

        const barraBuscadora = document.createElement('div')
        barraBuscadora.className = 'buscador'

        barraBuscadora.appendChild(buscador)
        
        main.appendChild(barraBuscadora)
    
        const table = document.createElement('table')
        const tituloTh1 = document.createElement('th')
        const tituloTh2 = document.createElement('th')
        const tituloTh3 = document.createElement('th')
        const tituloTh4 = document.createElement('th')
        const tituloTh5 = document.createElement('th')
        tituloTh1.textContent = 'DNI'
        tituloTh2.textContent = 'Apellido'
        tituloTh3.textContent = 'Nombre'
        tituloTh4.textContent = 'Edad'
        tituloTh5.textContent = ''
        table.appendChild(tituloTh1)
        table.appendChild(tituloTh2)
        table.appendChild(tituloTh3)
        table.appendChild(tituloTh4)
        table.appendChild(tituloTh5)

        estudiantes.forEach((element, index) => {
            const fila = document.createElement('tr')
            const columna1 = document.createElement('td')
            const columna2 = document.createElement('td')
            const columna3 = document.createElement('td')
            const columna4 = document.createElement('td')
            const columna5 = document.createElement('td')
            const btnEliminar = document.createElement('button')
            btnEliminar.id = `${index}`
            btnEliminar.textContent = 'Eliminar'
            btnEliminar.classList.add('btn','btn-danger','btn-sm')
            columna1.textContent = element._dni
            columna2.textContent = element._apellido
            columna3.textContent = element._nombre
            columna4.textContent = element._edad
            columna5.appendChild(btnEliminar)
            fila.appendChild(columna1)
            fila.appendChild(columna2)
            fila.appendChild(columna3)
            fila.appendChild(columna4)
            fila.appendChild(columna5)
            table.appendChild(fila)
        })

        main.appendChild(barraBuscadora)
        main.appendChild(table)

        eliminarAlumno()

        function renderTable(estudiantes) {
            // Limpiar las filas actuales de la tabla
            const filas = document.querySelectorAll('tr');
            filas.forEach((fila, index) => {
                if (index >= 0) fila.remove(); // No borrar la fila de los encabezados
            });
        
            // Añadir filas para cada estudiante
            estudiantes.forEach((element) => {
                const fila = document.createElement('tr');
                const columna1 = document.createElement('td');
                const columna2 = document.createElement('td');
                const columna3 = document.createElement('td');
                const columna4 = document.createElement('td');
                const columna5 = document.createElement('td')
                const btnEliminar = document.createElement('button')
                btnEliminar.id = `${element.index}`
                btnEliminar.textContent = 'Eliminar'
                btnEliminar.classList.add('btn','btn-danger','btn-sm')
                columna1.textContent = element.estudiante._dni;
                columna2.textContent = element.estudiante._apellido;
                columna3.textContent = element.estudiante._nombre;
                columna4.textContent = element.estudiante._edad;
                columna5.appendChild(btnEliminar)
                fila.appendChild(columna1);
                fila.appendChild(columna2);
                fila.appendChild(columna3);
                fila.appendChild(columna4);
                fila.appendChild(columna5)
                table.appendChild(fila);
            });
            eliminarAlumno()
        }

        buscador.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toUpperCase();

            const filteredNEstudiantes = estudiantes.map((estudiante, index) => {
                if (
                    estudiante._dni.toString() === searchTerm ||
                    estudiante._apellido.toUpperCase().includes(searchTerm.toUpperCase()) ||
                    estudiante._nombre.toUpperCase().includes(searchTerm.toUpperCase()) ||
                    estudiante._edad.toString().includes(searchTerm)
                ) {
                    return { estudiante, index }; // Retorna un objeto con el estudiante y su índice
                }
                return null; // Si no cumple, devuelve null
            })
            .filter(item => item !== null);

            renderTable(filteredNEstudiantes)
        });

    })


    // Evento para listar todos los alumnos
    const btnListaAlumnos = document.getElementById('listaAlumnos')

    btnListaAlumnos.addEventListener('click', () => {
        const main = document.querySelector('main')
        main.innerHTML = ''
        
        //Navegador de busqueda y filtro para ordenar
        const dropdown = document.createElement('div')
        dropdown.className = 'dropdown'
        dropdown.style = 'margin-top: 10px'

        const buscador = document.createElement('input')
        buscador.id = 'buscador'
        buscador.className = 'buscadorLista'
        buscador.placeholder = 'Buscar..'

        const btnDropdown = document.createElement('button')
        btnDropdown.classList.add('btn','btn-secondary', 'dropdown-toggle')
        btnDropdown.type = 'button'
        btnDropdown.setAttribute('data-bs-toggle','dropdown')
        btnDropdown.innerText = 'Ordenar por'

        dropdown.appendChild(btnDropdown)

        const dropdownMenu = document.createElement('ul')
        dropdownMenu.className = 'dropdown-menu'

        const dropItems = [
            {class: 'dropdown-item', href: '#', content: 'Apellido', id: 'apellido'},
            {class: 'dropdown-item', href: '#', content: 'Nombre', id: 'nombre'},
            {class: 'dropdown-item', href: '#', content: 'DNI', id: 'dni'},
            {class: 'dropdown-item', href: '#', content: 'Edad', id: 'edad'}
        ]

        dropItems.forEach(item => {
            const a = document.createElement('a')
            a.id = item.id
            a.innerText = item.content
            a.href = item.href
            a.className = item.class
            
            const li = document.createElement('li')
            li.appendChild(a)
            dropdownMenu.appendChild(li)
        })

        dropdown.appendChild(dropdownMenu)

        const barraBuscadora = document.createElement('div')
        barraBuscadora.className = 'buscador'


        barraBuscadora.appendChild(dropdown)
        barraBuscadora.appendChild(buscador)
        
        main.appendChild(barraBuscadora)

        // Creacion de la tabla de alumnos
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

        estudiantes.forEach((element) => {
            const fila = document.createElement('tr')
            const columna1 = document.createElement('td')
            const columna2 = document.createElement('td')
            const columna3 = document.createElement('td')
            const columna4 = document.createElement('td')
            columna1.textContent = element._dni
            columna2.textContent = element._apellido
            columna3.textContent = element._nombre
            columna4.textContent = element._edad
            fila.appendChild(columna1)
            fila.appendChild(columna2)
            fila.appendChild(columna3)
            fila.appendChild(columna4)
            table.appendChild(fila)
        })

        main.appendChild(table)
        
        const sortApellido = document.getElementById('apellido')
        sortApellido.addEventListener('click',ordenar)

        const sortNombre = document.getElementById('nombre')
        sortNombre.addEventListener('click',ordenar)

        const sortEdad = document.getElementById('edad')
        sortEdad.addEventListener('click',ordenar)

        const sortDni = document.getElementById('dni')
        sortDni.addEventListener('click',ordenar)


        function renderTable(estudiantes) {
            // Limpiar las filas actuales de la tabla
            const filas = document.querySelectorAll('tr');
            filas.forEach((fila, index) => {
                if (index >= 0) fila.remove(); // No borrar la fila de los encabezados
            });
        
            // Añadir filas para cada estudiante
            estudiantes.forEach((element) => {
                const fila = document.createElement('tr');
                const columna1 = document.createElement('td');
                const columna2 = document.createElement('td');
                const columna3 = document.createElement('td');
                const columna4 = document.createElement('td');
                columna1.textContent = element._dni;
                columna2.textContent = element._apellido;
                columna3.textContent = element._nombre;
                columna4.textContent = element._edad;
                fila.appendChild(columna1);
                fila.appendChild(columna2);
                fila.appendChild(columna3);
                fila.appendChild(columna4);
                table.appendChild(fila);
            });
        }
        
        // Evento de búsqueda en vivo
        buscador.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toUpperCase();
            const filteredEstudiantes = estudiantes.filter((estudiante, index)=> {
                return (
                    estudiante._dni.toString() === searchTerm ||
                    estudiante._apellido.toUpperCase().includes(searchTerm) ||
                    estudiante._nombre.toUpperCase().includes(searchTerm) ||
                    estudiante._edad.toString().includes(searchTerm)
                );
            });
            renderTable(filteredEstudiantes)
        });

    })
}

/**
 * Función que verifica si el array 'estudiantes' está vacío. Si es así, 
 * carga los datos de un archivo JSON externo (estudiantes.json) mediante `fetch` 
 * y agrega cada estudiante al array.
 */
const alumnosExistentes = async () => {
    if (estudiantes.length === 0){
        try {
            const url = './estudiantes.json'
            const estudiantesBase = await fetch(url)
            const estudiantesFetch = await estudiantesBase.json()
            
            estudiantesFetch.alumnos.forEach(estudiante => {
                let est = JSON.parse(JSON.stringify(estudiante))
                agregarAlumno(est)
            })
        } catch (error){
            console.error('Error al cargar el fetch: ', error)
        } 
    } 
}

/**
 * Función principal que inicializa la aplicación.
 * Llama a dos funciones claves: 
 *  - `alumnosExistentes`: para cargar los datos de los alumnos.
 *  - `cargaDOM`: para cargar el contenido inicial en el DOM.
 */
const app = () => {
    alumnosExistentes()
    cargaDOM()
}

app()