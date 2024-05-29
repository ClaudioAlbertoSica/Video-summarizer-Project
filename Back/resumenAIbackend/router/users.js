import express from 'express'
import Controller from '../controller/users.js'

class Router {
    constructor(persistencia) {
        this.router = express.Router()
        this.controlador = new Controller(persistencia)
    }

    /*los :id (user id) requeridos por parámetro los moví todos a la primera posicion después de la barra,
    de modo que:
        /:id/ejemplo1
        /ejemplo2/:id
        /ejemplpA/ejemploB/:id

    pasa a ser:
        /:id/ejemplo1 <--queda igual porque tiene el :id en la primera posición
        /:id/ejemplo2
        /:id/ejemplpA/ejemploB

    por otro lado: el / que es para crear el usuario... lo cambié a /guardar, para evitr conflictos
    */
    start() {
        this.router.post('/recuperar', this.controlador.olvideMiPasswd)
        this.router.post('/login', this.controlador.loguearse)
        this.router.post('/guardar', this.controlador.guardarUsuario)

        this.router.all('/:id/*', this.controlador.verificarSesion)

        this.router.post('/:id/sugerencia', this.controlador.enviarSugerencia)
        //this.router.get('/:id?', this.controlador.obtenerUsuarios)
        this.router.get('/:id', this.controlador.obtenerUsuarioResumido)
        this.router.get('/:id/inprogress', this.controlador.obtenerInProgress)
        this.router.post('/:id/resumen/video', this.controlador.crearResumenVideo)
        this.router.post('/:id/resumen/texto', this.controlador.crearResumenTexto)
        this.router.get('/:id/resumen/:idres?', this.controlador.obtenerResumenes)
        this.router.get('/:id/pdf/:idres?', this.controlador.crearYobtenerResumenEnPdf)
        this.router.delete('/:id/pdf/:pathFile', this.controlador.EliminarPdf)
        this.router.delete('/:id/resumen/:idres', this.controlador.borrarResumen)
        this.router.put('/:id/resumen/:idres', this.controlador.actualizarResumen)
        this.router.post('/:id/cambiarpass', this.controlador.cambiarPass)
        this.router.put('/:id', this.controlador.actualizarUsuario)
        this.router.delete('/:id', this.controlador.borrarUsuario)

        //NOS FALTAN: CREAR RESUMEN, ACTUALIZAR CONTRASEÑA

        return this.router
    }


}

export default Router
