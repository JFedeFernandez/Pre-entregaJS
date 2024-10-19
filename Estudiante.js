export class Estudiante {

    constructor (apellido, nombre, edad, dni) {
        this._apellido = apellido.toUpperCase()
        this._nombre = nombre.toUpperCase()
        this._edad = edad
        this._dni = dni
    }

    //Getters
    get apellido() {
        return this._apellido
    }

    get nombre() {
        return this._nombre
    }

    get edad() {
        return this._edad
    }

    get dni() {
        return this._dni
    }

    //Setters
    set apellido(value) {
        this._apellido = value
    }

    set nombre(value) {
        this._nombre = value
    }

    set edad(value) {
        this._edad = value
    }

    set dni(value) {
        this._dni = value
    }

    mostrarAlumno() {
        return `Apellido: ${this.apellido}, Nombre: ${this.nombre}, Edad: ${this.edad}, DNI: ${this.dni}`
    }
}