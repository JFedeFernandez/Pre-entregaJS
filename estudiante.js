class Estudiante {
    nombre;
    apellido;
    dni;
    edad;

    constructor (nombre, apellido, dni, edad){
        this.nombre = nombre.toUpperCase()
        this.apellido = apellido.toUpperCase()
        this.dni = dni
        this.edad = edad
    }

    /**
     * Getters
     */

    get getNombre(){
        return this.nombre
    }
    get getApellido(){
        return this.apellido
    }
    get getDni(){
        return this.dni
    }
    get getEdad(){
        return this.edad
    }

    /**
     * Setters
     */

    set nombre(nombre) {
        this.nombre = nombre.toUpperCase();
    }
    set setApellido(apellido) {
        this.apellido = apellido.toUpperCase();
    }
    set dni(dni) {
        this.dni = dni;
    }
    set edad(edad) {
        this.edad = edad;
    }
}

