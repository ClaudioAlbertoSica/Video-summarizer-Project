import Factory from '../models/DAO/modelFactory.js'

class Servicio {
    constructor (persistencia) {
        this.model = Factory.get(persistencia)
    }

    obtenerUsuarios = async (id) => {
        try {
            const usuarios = await this.model.obtenerUsuarios(id)
            return usuarios
        }
        catch(error) {
            console.log(error.message)   
        }
    }

    guardarUsuario = async (usuario) => {
        try {
            const usuarioGuardado = await this.model.guardarUsuario(usuario)
            return usuarioGuardado
        }
        catch(error) {
            console.log(error.message)
        }
    }

    actualizarUsuario = async (id, usuario) => {
        try {
            const usuarioActualizado = this.model.actualizarUsuario(id, usuario)
            return usuarioActualizado
        }
        catch(error) {
            console.log(error.message)
        }
    }

    borrarUsuario = async (id) => {
        try {
            const usuarioBorrado = this.model.borrarUsuario(id)
            return usuarioBorrado
        }
        catch(error) {
            console.log(`Error en servicios ${error.message}`)
            console.log(error.message)
        }
    }

    loguearse = async (userName, passwd) => {
        console.log(userName)
        console.log(passwd)
        try {
            let usuario = {}
            if (userName) {
                usuario = await this.model.obtenerUserPorNombre(userName)
                if (Object.keys(usuario).length === 0) {
                    console.log('usuario no encontrado')
                    return
                } 
                if (passwd !== undefined && usuario.passwd == passwd) {
                    console.log('LOGIN EXITOSO')
                    //comparamos con el encontrado
                } else {
                    console.log('REVISAR PASSWORD')
                }
            } else {
                console.log('formato de usuario INCORRECTO')
            }
            return usuario
        } catch (error) {
            
        }

    }


    obtenerResumenes = async (id, idres) => {
        try {
            //SI O SI TIENE QUE TENER UN ID
            const resumen = await this.model.obtenerResumenes(id, idres)
            return resumen
        }
        catch(error) {
            console.log(error.message)   
        }
    }

    borrarResumen = async (id, idres) => {
        try {

            const resumenEliminado = await this.model.borrarResumen(id, idres)
            return resumenEliminado
        }
        catch(error) {
            console.log(error.message)   
        }
    }


}

export default Servicio