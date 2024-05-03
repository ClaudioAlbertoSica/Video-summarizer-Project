import express from 'express'
import Controller from '../controller/users.js'

class Router {
    constructor (persistencia) {
        this.router = express.Router()
        this.controlador = new Controller(persistencia)
    }

    start() {
        this.router.get('/:id?', this.controlador.obtenerUsuarios)
        this.router.post('/:id/resumen/', this.controlador.crearResumenVideo)
        this.router.get('/:id/resumen/:idres?', this.controlador.obtenerResumenes)
        this.router.delete('/:id/resumen/:idres', this.controlador.borrarResumen)
        this.router.put('/:id/resumen/:idres', this.controlador.actualizarResumen)
        this.router.post('/login', this.controlador.loguearse)
        this.router.post('/cambiarpass/:id', this.controlador.cambiarPass)
        this.router.post('/', this.controlador.guardarUsuario)
        this.router.put('/:id', this.controlador.actualizarUsuario)
        this.router.delete('/:id', this.controlador.borrarUsuario)
        //NOS FALTAN: CREAR RESUMEN, ACTUALIZAR CONTRASEÑA

        return this.router
    }


}

export default Router