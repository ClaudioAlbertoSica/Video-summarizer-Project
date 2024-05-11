import Factory from '../models/DAO/modelFactory.js'
import { exec } from 'child_process'
//import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg'; NO BORRAR, VER RUTAS DE FFMPEG
import fs from 'fs'
import PDFDocument from 'pdfkit';
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

    //LLAMAMOS A LOS DOS SCRIPTS PY PARA PROCESAR VIDEO
    runPythonVideo = async () => {
        console.log('entre al script')
        const pythonScriptPath = './services/serviciosPython/procesarVideo.py';
        const command = `python ${pythonScriptPath} ${'https://www.youtube.com/watch?v=2Xa3Y4xz8_s'}`;
        

        return new Promise((resolve, reject) => {
            console.log('ejecute el script python - primera parte video')
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing Python script: ${error}`);
                    reject(error);
                }

                console.log(`Output: ${stdout}`);
                console.error(`Errors: ${stderr}`);
                resolve()
        })});
    }

    runPythonVideo2 = async () => {       

        const pythonScriptPath2 = './services/serviciosPython/procesarVideo2.py';
        const command2 = `python ${pythonScriptPath2}`;
        
        
        return new Promise((resolve, reject) => {
        exec(command2, (error, stdout, stderr) => {
            console.log('ejecute el script python - segunda parte video')
            if (error) {
                console.error(`Error executing Python script: ${error}`);
                reject(error)
            }

            console.log(`Output: ${stdout}`);
            console.error(`Errors: ${stderr}`);
            resolve()
        })});
    }

    //LLAMAMOS AL SCRIPT PY PARA PROCESAR TEXTO
    runPythonTexto = async () => {
        console.log('entre al script')
        const pythonScriptPath = './services/serviciosPython/procesarTexto.py';
        const command = `python ${pythonScriptPath}`;
        console.log('ejecute el script python - texto')
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

                await this.runPythonVideo()
                await this.runPythonVideo2();
                const partes = await this.dividirTextoEnPartes()
                console.log(partes)
                return {}
            } else {
                console.log('error de ingreso de datos')
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    leerTxt = async () =>{
        try {
            const textoResumido = await fs.promises.readFile('./services/serviciosPython/resumenSalida.txt', 'utf-8')
            console.log('Leído:')
            console.log(textoResumido)
            return textoResumido
        } catch (error) {
            console.error('Error leyendo archivo:', error)
            throw error; // Re-lanza el error para que se maneje externamente
        }
    }

    dividirTextoEnPartes = async() => {
        let texto = await this.leerTxt()
        texto = texto.replace(/\r?\n/g, '\n')
        const imagenes = await this.contarArchivosEnCarpeta()
        const numPartes = imagenes.length

        const parrafos = texto.split('\n').filter(parrafo => parrafo.trim() !== '')
    

        const parrafosPorParte = Math.ceil(parrafos.length / numPartes)
    
        const partes = []

        let inicio = 0
        for (let i = 0; i < numPartes; i++) {
            const fin = Math.min(inicio + parrafosPorParte, parrafos.length)
            let parte = parrafos.slice(inicio, fin).join('\n')
            
            
            if (parte.length < parrafosPorParte * 0.8 && i > 0) {
                partes[i - 1] += '\n' + parte
            } else {
                partes.push(parte)
            }
            inicio = fin
        }

        await this.generarPDF(partes, imagenes)
        console.log(partes)
        return partes
    }

    contarArchivosEnCarpeta = async () => {
        try {
            const carpeta = './services/serviciosPython/capturas'
            const archivos = await fs.promises.readdir(carpeta);
            // Ordenar los nombres de archivo como números
            archivos.sort((a, b) => {
            // Obtener los números de los nombres de archivo
            const numA = parseInt(a.split('.')[0]);
            const numB = parseInt(b.split('.')[0]);
            // Comparar los números
            return numA - numB;
        });

            console.log(archivos)
            return archivos
        } catch (error) {
            console.error('Error al leer la carpeta:', error);
            return 0;
        }
    }

    generarPDF = async (textoArray, imagenes) => {
        return new Promise((resolve, reject) => {
            const doc = new PDFDocument();
            const pdfPath = './services/serviciosPython/documento.pdf';
            const writeStream = fs.createWriteStream(pdfPath);

            doc.pipe(writeStream);
            doc.fontSize(12);
    
            for (let index = 0; index < textoArray.length; index++) {

                let texto = textoArray[index];

                doc.text(texto)
                doc.moveDown(0.5)
                
                doc.image(`./services/serviciosPython/capturas/${imagenes[index]}`, {
                    fit: [250, 250],
                    align: 'center',
                    valign: 'center',
                })
                doc.moveDown(0.5)

                if(index < textoArray.length-1){
                    doc.addPage()
                }

            }
            
            doc.end();
    
            writeStream.on('finish', () => {
                console.log('Documento PDF generado correctamente.');
                resolve({ path: pdfPath, name: 'documento.pdf' });
            });
    
            writeStream.on('error', error => {
                console.error('Error al generar documento PDF:', error);
                reject(error);
            });
        });
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
