import Factory from '../models/DAO/modelFactory.js'
import { exec } from 'child_process'


class Servicio {
    constructor (persistencia) {
        this.model = Factory.get(persistencia)
    }

    obtenerUsuarios = async (id) => {
        try {

            await this.runPython()


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

    actualizarResumen = async (id, idres, resumenNuevo) => {
        try {
            if (id && idres) {
                if (resumenNuevo) {
                    const resumenActualizado = await this.model.actualizarResumen(id, idres, resumenNuevo)
                    return resumenActualizado
                } else {
                    console.log('resumen nuevo incorrecto')    
                }
            } else {
                console.log('faltan datos para actualizar su resumen')
            }
        } catch (error) {
            console.log(error.message)   
        }
    }

    runPython = async () => {
        const pythonScriptPath = './serviciosPython/scriptTEST1.py'; 
        const command = `python ${pythonScriptPath}`;
        
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing Python script: ${error}`);
                return;
            }
            // Output from Python script
            console.log(`Output: ${stdout}`);
            console.error(`Errors: ${stderr}`);
        });
    }


    crearResumenVideo = async (id, url) => {
        try {
           if (1 == 1) {
                //0 TEST
                runPython = async () => {
                    const pythonScriptPath = '../serviciosPython/scriptTEST1.py'; 
                    const command = `python ${pythonScriptPath}`;
                    
                    exec(command, (error, stdout, stderr) => {
                        if (error) {
                            console.error(`Error executing Python script: ${error}`);
                            return;
                        }
                        // Output from Python script
                        console.log(`Output: ${stdout}`);
                        console.error(`Errors: ${stderr}`);
                    });
                }
                
            
                //1 SACAR MP3 DEL VIDEO DE YOUTUBE  
                //2 SACAR TRANSCRIPT DEL MP3

                //3 DESCARGAR VIDEO - SACAR IMAGENES 

                
                //...
           } else {
            console.log('error de ingreso de datos')
           }
        } catch (error) {
            console.log(error.message)   
        }
    }


}

export default Servicio