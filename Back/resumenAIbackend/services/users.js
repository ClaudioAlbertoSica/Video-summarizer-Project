import Factory from '../models/DAO/modelFactory.js'
import { exec } from 'child_process'
//import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg'; NO BORRAR, VER RUTAS DE FFMPEG
import fs from 'fs'
class Servicio {
    constructor(persistencia) {
        this.model = Factory.get(persistencia)
    }

    obtenerUsuarios = async (id) => {
        try {

            //await this.runPython() ESTO ERA UN TEST


            const usuarios = await this.model.obtenerUsuarios(id)
            return usuarios
        }
        catch (error) {
            console.log(error.message)
        }
    }

    guardarUsuario = async (usuario) => {
        try {
            const usuarioGuardado = await this.model.guardarUsuario(usuario)
            return usuarioGuardado
        }
        catch (error) {
            console.log(error.message)
        }
    }

    actualizarUsuario = async (id, usuario) => {
        try {
            const usuarioActualizado = this.model.actualizarUsuario(id, usuario)
            return usuarioActualizado
        }
        catch (error) {
            console.log(error.message)
        }
    }

    borrarUsuario = async (id) => {
        try {
            const usuarioBorrado = this.model.borrarUsuario(id)
            return usuarioBorrado
        }
        catch (error) {
            console.log(`Error en servicios ${error.message}`)
            console.log(error.message)
        }
    }

    loguearse = async (userName, passwd) => {
        try {
            let usuario = {};
            if (userName) {
                usuario = await this.model.obtenerUsuariosLogin(userName)
                if (Object.keys(usuario).length === 0) {
                    console.log('usuario no encontrado')
                    throw new Error('Usuario incorrecto');
                }
                if (passwd !== undefined && usuario.passwd == passwd) {
                    console.log('LOGIN EXITOSO')
                    //comparamos con el encontrado
                } else {
                    console.log('REVISAR PASSWORD')
                    throw new Error('password incorrecto');
                }
            } else {
                throw new Error('formato de usuario INCORRECTO');
            }
            return usuario
        } catch (error) {
            throw error;
        }
    }


    obtenerResumenes = async (id, idres) => {
        try {
            //SI O SI TIENE QUE TENER UN ID
            const resumen = await this.model.obtenerResumenes(id, idres)
            return resumen
        }
        catch (error) {
            console.log(error.message)
        }
    }

    borrarResumen = async (id, idres) => {
        try {

            const resumenEliminado = await this.model.borrarResumen(id, idres)
            return resumenEliminado
        }
        catch (error) {
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

    runPythonVideo = async () => {
        console.log('entre al script')
        const pythonScriptPath = './services/serviciosPython/procesarVideo.py';
        const command = `python ${pythonScriptPath} ${'https://www.youtube.com/watch?v=bSvTVREwSNw'}`;
        console.log('ejecute el script python')

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

    runPythonTexto = async () => {
        console.log('entre al script')
        const pythonScriptPath = './services/serviciosPython/procesarTexto.py';
        const command = `python ${pythonScriptPath}`;
        console.log('ejecute el script python')
        return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing Python script: ${error}`);
                reject(error);
            }
            // Output from Python script
            console.log(`Output: ${stdout}`);
            console.error(`Errors: ${stderr}`);
            resolve();
        })});
    }


    crearResumenVideo = async (id, url) => {
        try {
            if (1 == 1) {
                //0 TEST
                await this.runPythonVideo()


                //1 SACAR MP3 DEL VIDEO DE YOUTUBE  
                //2 SACAR TRANSCRIPT DEL MP3

                //3 DESCARGAR VIDEO - SACAR IMAGENES 


                //...
                return {}
            } else {
                console.log('error de ingreso de datos')
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    crearResumenTexto = async (id, texto, esBreve, idioma, titulo) => {
        const rutaEntrada = './services/serviciosPython/textoEntrada.txt'
        const rutaSalida = './services/serviciosPython/textoSalida.txt'
        const resumen = {}
        try {
            if (id, texto, esBreve, idioma) {
                resumen.esBreve = esBreve
                resumen.idioma = idioma
                if(titulo){
                    resumen.titulo = titulo
                }else{
                    resumen.titulo = "ResumenDeTexto"
                }

                await fs.promises.writeFile(rutaEntrada, texto, (err) => {
                    if (err) {
                        console.log('error escribiendo archivo')
                    } else {
                        console.log('se escribio')
                    }
                })

                await this.runPythonTexto()
                
                const textoResumido = await fs.promises.readFile(rutaSalida, 'utf-8', (err) => {
                    if (err) {
                        console.log('error leyendo archivo')
                    } else {
                        console.log('Leido')
                    }
                })
                resumen.text = textoResumido
            }else {
                console.log('error de ingreso de datos')
            }

                

                const resumenNuevo = await this.model.crearResumenTexto(id, resumen)

                return resumenNuevo
            }catch (error) {
            console.log(error.message)
        }
    }

    cambiarPass = async (id, passActual, passNueva, passNuevaBis) => {
        //try {
        let usuarioActualizado = {}
        if (id, passActual, passNueva, passNuevaBis) {
            const usuario = await this.model.obtenerUsuarios(id)
            if (usuario) {
                if (usuario.passwd === passActual) {
                    if (passNueva === passNuevaBis) {
                        if (usuario.passwd !== passNueva) {
                            usuarioActualizado = await this.actualizarUsuario(id, { passwd: passNueva })
                            console.log("La constraseña se actualizó correctamente.")
                            return usuarioActualizado
                        } else {
                            throw new Error('La contraseña nueva no puede ser igual a la actual.');
                        }
                    } else {
                        throw new Error('Las contraseñas nuevas no coinciden.');
                    }
                } else {
                    throw new Error('La contraseña actual es inválida.');
                }
            } else {
                throw new Error('Usuario no encontrado.');
            }
        } else {
            throw new Error('Faltan datos en la solicitud.');
        }
        //}catch (error) {
        //  console.log(error.message) 
        //}
    }

    

}
export default Servicio
