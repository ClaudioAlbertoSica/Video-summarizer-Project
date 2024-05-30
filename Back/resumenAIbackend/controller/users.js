import Servicio from '../services/users.js'

class Controlador {
    constructor(persistencia) {
        this.servicio = new Servicio(persistencia)
    }

    verificarSesion = async (req, res, next) => {
        try {
            debugger;
            const { id } = req.params;
            const passwd = req.headers.passwd;
            console.log("1 - " + id + " - " + passwd)
            const resultadoDelCheck = await this.servicio.verificarSesion(id, passwd)
            console.log("2 - " + resultadoDelCheck)
            if (resultadoDelCheck) {
                console.log("Pasó la validación de sesión!")
                next()
            } else {
                res.status(500).send("Invalid Request")
            }
        }
        catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    obtenerUsuarios = async (req, res) => {
        try {
            const { id } = req.params
            const usuarios = await this.servicio.obtenerUsuarios(id)
            res.json(usuarios)
        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    obtenerUsuarioResumido = async (req, res) => {
        try {
            const { id } = req.params
            const usuarioResumido = await this.servicio.obtenerUsuariosResumido(id)
            res.json(usuarioResumido)
        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    guardarUsuario = async (req, res) => {
        try {
            const usuario = req.body
            const usuarioGuardado = await this.servicio.guardarUsuario(usuario)
            res.json(usuarioGuardado)
        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    //EVITAR CAMBIO DE CONTRASEÑA POR ACA
    actualizarUsuario = async (req, res) => {
        try {
            const { id } = req.params
            const usuario = req.body
            const usuarioActualizado = await this.servicio.actualizarUsuario(id, usuario)
            res.json(usuarioActualizado)
        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    borrarUsuario = async (req, res) => {
        try {
            const { id } = req.params
            const usuarioBorrado = await this.servicio.borrarUsuario(id)
            res.json(usuarioBorrado)
        }
        catch (error) {
            console.log(`Error en controller ${error.message}`)
            res.status(500).json({ error: error.message })
        }
    }


    loguearse = async (req, res) => {
        try {
            const { userName, passwd } = req.body
            const userLogueado = await this.servicio.loguearse(userName, passwd)
            res.json(userLogueado)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    obtenerResumenes = async (req, res) => {
        try {
            const { id, idres } = req.params
            const resumenes = await this.servicio.obtenerResumenes(id, idres)
            res.json(resumenes)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    crearYobtenerResumenEnPdf = async (req, res) => {
        try {
            const { id, idres } = req.params;
            const pdf = await this.servicio.crearYobtenerResumenEnPdf(id, idres);
            res.sendFile(pdf);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    EliminarPdf = async (req, res) => {
        try {
            const { filePath } = req.params
            const resumenEliminado = await this.servicio.borrarResumen(filePath)
            res.json(resumenEliminado)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    borrarResumen = async (req, res) => {
        try {
            const { id, idres } = req.params
            const resumenEliminado = await this.servicio.borrarResumen(id, idres)
            res.json(resumenEliminado)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    actualizarResumen = async (req, res) => {
        try {
            const { id, idres } = req.params
            const resumenNuevo = req.body
            const resumenActualizado = await this.servicio.actualizarResumen(id, idres, resumenNuevo)
            res.json(resumenActualizado)
        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    crearResumenVideo = async (req, res) => {
        try {
            const { id } = req.params
            let { url, title, esBreve, idioma } = req.body
            url = String(url)
            const urlOriginal = url
            title = String(title)

            if (url.indexOf('&') !== -1) {
                url = url.replace(/&/g, '"&"');
            }
            const resumenNuevo = () => this.servicio.crearResumenVideo(id, url, title, esBreve, idioma, urlOriginal)
            resumenNuevo()
            res.status(200).json(false)
            //res.json(resumenNuevo)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    crearResumenTexto = async (req, res) => {
        try {
            const { id } = req.params
            const { texto, esBreve, idioma, title } = req.body
            const resumenCreado = () => this.servicio.crearResumenTexto(id, texto, esBreve, idioma, title)
            resumenCreado()
            res.status(200).json(false)
            //res.json(resumenCreado)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    cambiarPass = async (req, res) => {
        try {
            const { id } = req.params
            const { passActual, passNueva, passNuevaBis } = req.body
            const usuarioActualizado = await this.servicio.cambiarPass(id, passActual, passNueva, passNuevaBis)
            res.json(usuarioActualizado)

        } catch (error) {
            res.status(500).json({ error: error.message })
        }

    }

    olvideMiPasswd = async (req, res) => {
        try {
            const { userName } = req.body
            const provisoria = await this.servicio.olvideMiPasswd(userName)
            res.json(provisoria)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    enviarSugerencia = async (req, res) => {
        try {
            const { id } = req.params
            const { sugerencia } = req.body
            const rta = await this.servicio.enviarSugerencia(id, sugerencia)
            res.json(rta)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }


    obtenerInProgress = async (req, res) => {
        try {
            const { id } = req.params
            const inProgress = await this.servicio.obtenerInProgress(id)
            res.json(inProgress)
        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}

export default Controlador
