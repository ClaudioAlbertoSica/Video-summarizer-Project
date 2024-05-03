import Servicio from '../services/users.js'

class Controlador {
    constructor (persistencia) {
        this.servicio = new Servicio(persistencia)
    }

    obtenerUsuarios = async (req, res) => {
        try {
            const { id } = req.params
            const usuarios = await this.servicio.obtenerUsuarios(id)
            res.json(usuarios)
        }
        catch(error) {
            res.status(500).json({error:error.message})   
        }
    }

    guardarUsuario = async (req, res) => {
        try {
            const usuario = req.body
            const usuarioGuardado = await this.servicio.guardarUsuario(usuario)
            res.json(usuarioGuardado)
        }
        catch(error) {
            res.status(500).json({error:error.message})   
        }
    }

    actualizarUsuario = async (req, res) => {
        try {
            const { id } = req.params
            const usuario = req.body
            const usuarioActualizado = await this.servicio.actualizarUsuario(id, usuario)
            res.json(usuarioActualizado)
        }
        catch(error) {
            res.status(500).json({error:error.message})   
        }
    }

    borrarUsuario = async (req, res) => {
        try {
            const { id } = req.params
            const usuarioBorrado = await this.servicio.borrarUsuario(id)
            res.json(usuarioBorrado)
        }
        catch(error) {
            console.log(`Error en controller ${error.message}`)
            res.status(500).json({error:error.message})   
        }
    }


    loguearse = async (req, res) => {
        try {
            const { userName, passwd } = req.body
            const userLogueado = await this.servicio.loguearse(userName, passwd)
            res.json(userLogueado)
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    }

    obtenerResumenes = async (req, res) => {
        try {
            const { id, idres } = req.params
            const resumenes = await this.servicio.obtenerResumenes(id,idres)
            res.json(resumenes)
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    }

    borrarResumen = async (req, res) => {
        try {
            const { id, idres } = req.params
            const resumenEliminado = await this.servicio.borrarResumen(id,idres)
            res.json(resumenEliminado)
        } catch (error) {
            res.status(500).json({error:error.message})   
        }
    }

    actualizarResumen = async (req, res) => {
        try {
            const { id, idres } = req.params
            const resumenNuevo = req.body
            const resumenActualizado = await this.servicio.actualizarResumen(id, idres, resumenNuevo)
            res.json(resumenActualizado)
        }
        catch(error) {
            res.status(500).json({error:error.message})   
        }
    }

    crearResumenVideo = async (req, res) => {
        try {
            const { id } = req.params
            const url = req.body
            const resumenCreado = this.servicio.crearResumenVideo(id, url)
            res.json(resumenCreado)
        } catch (error) {
            res.status(500).json({error:error.message})  
        }
    }
    
    cambiarPass = async (req, res) => {

        try {
            const { id } = req.params
            const {passActual, passNueva, passNuevaBis} = req.body
            const usuarioActualizado = await this.servicio.cambiarPass(id, passActual, passNueva, passNuevaBis)
            res.json(usuarioActualizado)

        } catch (error) {
            res.status(500).json({error:error.message})
        }

    }
}

export default Controlador
