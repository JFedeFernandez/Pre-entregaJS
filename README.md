# Sistema de Gestión de Estudiantes

Este proyecto es una aplicación de gestión de alumnos. Permite realizar las siguientes acciones a través de eventos en la interfaz de usuario:
- Agregar nuevos alumnos mediante un formulario dinámico.
- Editar alumnos existentes mostrando una tabla interactiva para seleccionar y modificar datos.
- Eliminar alumnos de una lista interactiva.
- Listar todos los alumnos con opciones para buscar y ordenar por diferentes criterios.

El código principal maneja la creación de estos eventos, el renderizado dinámico de los formularios y las tablas, y el procesamiento de los datos almacenados.

# Funcionalidades

- **Agregar Estudiante**:
    - El botón "Nuevo Alumno" abre un formulario en el main donde se puede registrar un nuevo alumno ingresando apellido, nombre, edad y DNI.
    - El botón Aceptar procesa el formulario y guarda los datos.
    - El botón Cancelar borra el formulario y limpia la pantalla.

- **Editar Estudiantes**: 
    - El botón "Editar Alumno" abre una lista de alumnos en formato de tabla con la opción de buscar por apellido, nombre, edad, o DNI.
    - Cada fila tiene un botón Editar que permite modificar los datos de un alumno seleccionado.
    - Se actualiza la lista según los términos ingresados en el buscador.

- **Eliminar Estudiante**:
    - El botón "Eliminar Alumno" abre una lista de alumnos similar a la de edición.
    - Cada fila incluye un botón Eliminar que borra el registro del alumno seleccionado.

- **Listar Estudiante**: 
    - El botón "Lista de Alumnos" muestra una tabla con todos los alumnos registrados.
    - Incluye un campo de búsqueda para filtrar los alumnos y un menú desplegable para ordenar por apellido, nombre, edad o DNI.

- **Carga de Alumnos desde Archivo JSON**:
    - Si la lista de alumnos está vacía, la aplicación carga los datos desde un archivo JSON (`estudiantes.json`) usando fetch, y los almacena en el array global estudiantes.

# Estructura del Proyecto
- `index.html`: Contiene la estructura básica de la interfaz de usuario, como el header y el elemento main donde se carga el contenido dinámico.
- `estudiantes.json`: Archivo JSON que contiene una lista de alumnos.
- `main.js`: Script principal que incluye la lógica de carga del DOM, los eventos de interacción y la manipulación de los datos de alumnos.

# Librerias utilizadas
### Bootstrap
**Versión**: 5.3.3

Bootstrap es un framework CSS que permite desarrollar aplicaciones web responsivas y móviles de manera sencilla.

- **Documentación**: [Bootstrap Documentation](https://getbootstrap.com/docs/5.3/getting-started/introduction/)

### SweetAlert2
**Versión**: 11.0.0

SweetAlert2 es una librería para crear alertas personalizadas que mejoran la experiencia del usuario al interactuar con el sistema.

- **Documentación**: [SweetAlert2 Documentation](https://sweetalert2.github.io/)

# Cómo Ejecutar
1) Clona o descarga este repositorio.
2) Asegúrate de que todos los archivos estén en el mismo directorio, incluyendo `index.html`, `estudiantes.json` y `main.js`.
3) Abre el archivo `index.html en un navegador.
4) Usa los botones para interactuar con la aplicación: agregar, editar, eliminar y listar alumnos.

# Dependencias 
- El archivo `estudiantes.json` debe estar en el mismo directorio que el archivo index.html para la correcta carga de los datos iniciales.

# Consideraciones
- El archivo `estudiantes.json` se utiliza para simular una base de datos de alumnos.
- Asegúrate de que el archivo `estudiantes.json` esté correctamente formateado.

# Autor
Desarrollado por Fernandez Jorge Federico
