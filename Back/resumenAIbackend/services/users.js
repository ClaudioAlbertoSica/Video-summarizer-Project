import Factory from '../models/DAO/modelFactory.js'
import { exec } from 'child_process'
//import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg'; NO BORRAR, VER RUTAS DE FFMPEG
import fs from 'fs'
import PDFDocument from 'pdfkit';
import path from 'path'
import { fileURLToPath } from 'url';
import NodeMailer from './notifications/nodemailer.js'
import NodeMailerSug from './notifications/nodemailerSug.js'
import axios from 'axios';

class Servicio {
    constructor(persistencia) {
        this.model = Factory.get(persistencia)
        this.nodeMailer = new NodeMailer()
        this.nodeMailerSug = new NodeMailerSug()
    }


    verificarSesion = async (id, passwd) => {
        let usuarioEncontrado = null;
        if (id) {
            usuarioEncontrado = await this.model.obtenerUsuarios(id)
        }
        return usuarioEncontrado ? usuarioEncontrado.passwd === passwd : false
    }

    //Finalizado
    obtenerUsuarios = async (id) => {
        try {
            const usuarios = await this.model.obtenerUsuarios(id)
            return usuarios
        }
        catch (error) {
            console.log(error.message)
        }
    }

    obtenerUsuariosResumido = async (id) => {
        try {
            const usuario = await this.model.obtenerUsuarios(id);
            const usuarioResumido = await this.model.obtenerUsuariosLogin(usuario.userName);
            delete usuarioResumido._id;
            delete usuarioResumido.passwd;

            return usuarioResumido;
        } catch (error) {
            console.log(error.message);
        }
    }

    //Finalizado
    guardarUsuario = async (usuario) => {
        try {
            const usuarioGuardado = await this.model.guardarUsuario(usuario)
            return usuarioGuardado
        }
        catch (error) {
            throw new Error(error.message)
        }
    }

    //A REVISAR EN LA PARTE DE MODEL (CUANDO LE PASAMOS UN RESUMEN NOS AGREGABA MUCHOS IGUALES)
    actualizarUsuario = async (id, usuario) => {
        try {
            const usuarioActualizado = await this.model.actualizarUsuario(id, usuario)
            delete usuarioActualizado.passwd
            return usuarioActualizado
        }
        catch (error) {
            console.log(error.message)
        }
    }

    //Finalizado
    borrarUsuario = async (id) => {
        try {
            const usuarioBorrado = await this.model.borrarUsuario(id)
            return usuarioBorrado
        }
        catch (error) {
            console.log(`Error en servicios ${error.message}`)
            console.log(error.message)
        }
    }

    //A MEJORAR DEVOLUCIÓN DE ERRORES Y MODIFICAR DEVOLUCIÓN DE USUARIO (SIN PASS Y SOLO DETERMINADAS PROPIEDADES)
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
                    delete usuario._id
                    delete usuario.passwd

                    console.log('LOGIN EXITOSO')
                    //await this.nodeMailer.sendMail(usuario.userName)
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


    //REVISAR UNA VEZ QUE TENGAMOS LOS PDF PERSISTIDOS
    obtenerResumenes = async (id, idres) => {
        try {
            //SI O SI TIENE QUE TENER UN ID
            if (id) {
                const resumen = await this.model.obtenerResumenes(id, idres)
                return resumen
            } else {
                throw new Error('ID INDEFINIDO')
            }
        }
        catch (error) {
            console.log(error.message)
        }
    }

    crearYobtenerResumenEnPdf = async (id, idres) => {
        try {
            if (id) {
                // Obtener la ruta del directorio de archivos PDF
                const __filename = fileURLToPath(import.meta.url);
                const __dirname = path.dirname(__filename);
                const pdfsDir = path.join(__dirname, 'pdfs');

                // Asegúrate de que el directorio exista, creándolo si es necesario
                fs.mkdirSync(pdfsDir, { recursive: true });

                // Obtener la lista de archivos en el directorio
                const files = fs.readdirSync(pdfsDir);

                // Eliminar todos los archivos en el directorio
                files.forEach(file => {
                    const filePath = path.join(pdfsDir, file);
                    fs.unlinkSync(filePath);
                    console.log('Archivo eliminado:', filePath);
                });

                // Obtener el resumen y convertirlo a PDF
                const resumen = await this.model.obtenerResumenes(id, idres);
                const pdfBase64 = resumen.pdf.data;
                const pdfBuffer = Buffer.from(pdfBase64, 'base64');

                // Obtener el nombre del archivo y la ruta absoluta
                const fileName = `resumen_${id}_${idres}.pdf`;
                const filePath = path.join(pdfsDir, fileName);

                // Guardar el archivo PDF en el servidor
                fs.writeFileSync(filePath, pdfBuffer);
                console.log('Archivo creado:', filePath);

                return filePath; // Devuelve la ruta del archivo
            } else {
                throw new Error('ID INDEFINIDO');
            }
        } catch (error) {
            console.error('Error al crear el archivo PDF:', error.message);
        }
    }

    EliminarPdf = async (filePath) => {
        try {
            if (!filePath) {
                throw new Error('Ruta de archivo indefinida');
            }

            // Convierte la ruta a una ruta absoluta
            const absolutePath = path.resolve(filePath);

            // Verifica si el archivo existe antes de intentar eliminarlo
            if (fs.existsSync(absolutePath)) {
                // Elimina el archivo de forma sincrónica
                fs.unlinkSync(absolutePath);
                console.log('Archivo eliminado:', absolutePath);
                return true;
            } else {
                console.log('El archivo no existe:', absolutePath);
                return false;
            }
        } catch (error) {
            console.error('Error al eliminar el archivo:', error.message);
            return false;
        }
    }

    //REVISAR (pero creo que funciona OK)
    borrarResumen = async (id, idres) => {
        try {

            const resumenEliminado = await this.model.borrarResumen(id, idres)
            return resumenEliminado
        }
        catch (error) {
            console.log(error.message)
        }
    }

    //REVISAR (pero creo que funciona OK)
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
    runPythonVideo = async (url) => {


        const pythonScriptPath = './services/serviciosPython/procesarVideo.py';
        const command = `python ${pythonScriptPath} ${url}`;
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
            })
        });
    }

    //FALTA ENVIARLE POR PARÁMETRO EL BOOL ES BREVE PARA QUE SEPAMOS SI QUIERE UN RESUMEN EXTENSO O CORTO.
    runPythonVideo2 = async (esBreve, idioma) => {


        if (esBreve) {
            esBreve = 1
        } else {
            esBreve = 0
        }

        switch (idioma) {
            case 'EN':
                idioma = 0
                break;
            case 'ES':
                idioma = 1
                break;
            case 'FR':
                idioma = 2
                break;
            case 'HE':
                idioma = 3
                break;
            case 'PT':
                idioma = 4
                break;
        }


        const pythonScriptPath2 = './services/serviciosPython/procesarVideo2.py';
        const command2 = `python ${pythonScriptPath2} ${esBreve} ${idioma}`;


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
            })
        });
    }

    //LLAMAMOS AL SCRIPT PY PARA PROCESAR TEXTO
    runPythonTexto = async (esBreve, idioma) => {

        if (esBreve) {
            esBreve = 1
        } else {
            esBreve = 0
        }

        switch (idioma) {
            case 'EN':
                idioma = 0
                break;
            case 'ES':
                idioma = 1
                break;
            case 'FR':
                idioma = 2
                break;
            case 'HE':
                idioma = 3
                break;
            case 'PT':
                idioma = 4
                break;
        }


        const pythonScriptPath = './services/serviciosPython/procesarTexto.py';
        const command = `python ${pythonScriptPath} ${esBreve} ${idioma}`;
        console.log('ejecute el script python - texto')
        //console.log('ejecute el script python')
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
            })
        });
    }


    corregirTranscript = async () => {
        let textoResumido = await fs.promises.readFile('./services/serviciosPython/transcripcion.txt', 'utf-8', (err) => {
            if (err) {
                console.log('error leyendo archivo')
            } else {
                console.log('Leido')
            }
        })

        textoResumido = textoResumido.replace(/�/g, '');


        await fs.promises.writeFile('./services/serviciosPython/transcripcion.txt', textoResumido, (err) => {
            if (err) {
                console.log('error escribiendo archivo')
            } else {
                console.log('se escribio')
            }
        })


    }

    obtenerMiniatura = async (urlP) => {
        try {
            const url = new URL(urlP);
            const videoID = await url.searchParams.get('v');
            const thumbnailUrl = `https://img.youtube.com/vi/${videoID}/hqdefault.jpg`;
            return thumbnailUrl
        } catch (error) {
            console.error('Error al descargar la miniatura:', error);
        }
    }

    //FALTA ENVIARLE POR PARÁMETRO EL BOOL ES BREVE PARA QUE SEPAMOS SI QUIERE UN RESUMEN EXTENSO O CORTO.
    crearResumenVideo = async (id, url, title, esBreve, idioma, urlOriginal) => {
        try {
            await this.limpiarVideo()
            const resumenVid = {}
            if (id, url, esBreve, idioma) {
                await this.actualizarUsuario(id, { inProgress: true })
                const thumbnail = await this.obtenerMiniatura(urlOriginal)
                resumenVid.thumbnail = thumbnail
                resumenVid.isFavourite = false
                resumenVid.points = 0
                if (title) {
                    resumenVid.title = title
                } else {
                    resumenVid.title = "ResumenDeVideo"
                }



                await this.runPythonVideo(url);
                console.log('CORRÍ PYTHON 1')
                await this.corregirTranscript();
                await this.runPythonVideo2(esBreve, idioma);
                console.log('CORRÍ PYTHON 2')
                await this.runPythonArmado();
                console.log('CORRÍ PYTHON 3 - arma pdf')
                resumenVid.pdf = await this.pasarPDFABinario()
                console.log('CORRÍ PYTHON 4 - pasa binario')

                console.log('antes de entrar a model')

                const resumenNuevo = await this.model.crearResumenVideo(id, resumenVid)

                await this.limpiarVideo()

                await this.actualizarUsuario(id, { inProgress: false })


                console.log('volvi de meter el resumen!')
                return resumenNuevo
            } else {
                console.log('error de ingreso de datos')
            }
        } catch (error) {
            console.log('estoy entrando al catch')
            console.log(error.message)
            await this.actualizarUsuario(id, { inProgress: false })
            //await this.limpiarVideo()

        }
    }

    runPythonArmado = async () => {

        const pythonScriptPath3 = './services/serviciosPython/armarPDF.py';
        const command = `python ${pythonScriptPath3}`;

        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                console.log('ejecute el script python - armando el PDF...')
                if (error) {
                    console.error(`Error executing Python script: ${error}`);
                    reject(error)
                }
                console.log(`Output: ${stdout}`);
                console.error(`Errors: ${stderr}`);
                resolve()
            })
        });
    }

    //FALTA AGREGAR LA PROPIEDAD POINT.
    //FALTA RESOLVER EN TODOS LOS RESÚMENES EL TEMA DE LA TRADUCCIÓN
    crearResumenTexto = async (id, texto, esBreve, idioma, title) => {
        const rutaEntrada = './services/serviciosPython/textoEntrada.txt'
        const rutaSalida = './services/serviciosPython/textoSalida.txt'
        const resumen = {}
        try {
            await this.limpiarTexto()
            if (id, texto, esBreve, idioma) {
                await this.actualizarUsuario(id, { inProgress: true })
                if (title) {
                    resumen.title = title
                } else {
                    resumen.title = "ResumenDeTexto"
                }
                resumen.isFavourite = false
                resumen.points = 0
                console.log('actualizo a true el progress... :)');

                await fs.promises.writeFile(rutaEntrada, texto, (err) => {
                    if (err) {
                        console.log('error escribiendo archivo')
                    } else {
                        console.log('se escribio')
                    }
                })

                await this.runPythonTexto(esBreve, idioma)

                const textoResumido = await fs.promises.readFile(rutaSalida, 'utf-8', (err) => {
                    if (err) {
                        console.log('error leyendo archivo')
                    } else {
                        console.log('Leido')
                    }
                })
                await this.generarPDFTexto(textoResumido)
                resumen.pdf = await this.pasarPDFABinario()
            } else {
                console.log('error de ingreso de datos')
            }

            const resumenNuevo = await this.model.crearResumenTexto(id, resumen)

            await this.limpiarTexto()

            await this.actualizarUsuario(id, { inProgress: false })
            return resumenNuevo
        } catch (error) {
            await this.actualizarUsuario(id, { inProgress: false })
            console.log(error.message)
        }
    }

    limpiarTexto = async () => {
        const directoryPath = './services/serviciosPython/';
        const filesToDelete = ['textoEntrada.txt', 'documento.pdf', 'textoSalida.txt']; // Specify the exact files to delete here

        try {
            for (const file of filesToDelete) {
                const filePath = path.join(directoryPath, file);

                try {
                    await fs.promises.unlink(filePath);
                    console.log(`Deleted file: ${filePath}`);
                } catch (err) {
                    //console.error(`Error deleting file ${filePath}:`, err);
                }
            }
            console.log('Finished deleting specified files.');
        } catch (err) {
            //console.error('Error:', err);
        }
    };

    limpiarVideo = async () => {
        const mainDirectoryPath = './services/serviciosPython/';
        const imageDirectoryPath = './services/serviciosPython/capturas/';
        const filesToDelete = ['resumenSalida.txt', 'transcripcion.txt', 'documento.pdf'];

        try {
            for (const file of filesToDelete) {
                const filePath = path.join(mainDirectoryPath, file);

                try {
                    await fs.promises.unlink(filePath);
                    console.log(`Deleted file: ${filePath}`);
                } catch (err) {
                    //console.error(`Error deleting file ${filePath}:`, err);
                }
            }
            const imageFiles = await fs.promises.readdir(imageDirectoryPath);
            for (const file of imageFiles) {
                const filePath = path.join(imageDirectoryPath, file);

                try {
                    const stats = await fs.promises.stat(filePath);
                    if (stats.isFile() && file.endsWith('.png')) {
                        await fs.promises.unlink(filePath);
                        console.log(`Deleted image file: ${filePath}`);
                    }
                } catch (err) {
                    // console.error(`Error deleting image file ${filePath}:`, err);
                }
            }

            console.log('Finished deleting specified video files and all .png files.');
        } catch (err) {
            //console.error('Error:', err);
        }
    }


    //NO MODIFICAR, FUNCIONA PERFECTAMENTE
    generarPDFTexto = async (texto) => {
        return new Promise((resolve, reject) => {

            texto = texto.replace(/\r?\n/g, '\n')

            const doc = new PDFDocument();
            const pdfPath = './services/serviciosPython/documento.pdf';
            const writeStream = fs.createWriteStream(pdfPath);
            doc.pipe(writeStream);
            doc.fontSize(12);
            doc.text(texto)
            doc.moveDown(0.5)
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



    //TEMA TRY CATCH: TENEMOS QUE VOLVER A PROBAR PERO SI LO DEJAMOS LA EJECUCIÓN SIGUE
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
                            if (usuarioActualizado.provisoria) {
                                usuarioActualizado.provisoria = false
                                usuarioActualizado = await this.actualizarUsuario(id, usuarioActualizado)
                            }
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

    olvideMiPasswd = async (userName) => {
        try {
            if (userName) {
                debugger;
                let usuarioEncontrado = await this.model.obtenerUsuariosLogin(userName)
                if (usuarioEncontrado) {
                    usuarioEncontrado.passwd = await this.randomizarPass()
                    usuarioEncontrado.provisoria = true
                    const usuarioActualizado = await this.model.actualizarUsuario(usuarioEncontrado.id, usuarioEncontrado)
                    await this.nodeMailer.sendMail(usuarioActualizado.userName, usuarioActualizado.passwd)
                    return usuarioActualizado.provisoria
                }
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    randomizarPass = async (length = 8) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let passRandom = '';
        for (let i = 0; i < length; i++) {
            await new Promise(resolve => setTimeout(resolve, 0));
            const randomIndex = Math.floor(Math.random() * characters.length);
            passRandom += characters[randomIndex];
        }

        return passRandom;
    }

    obtenerInProgress = async (id) => {
        try {
            const usuario = await this.model.obtenerUsuarios(id)
            const inProgress = usuario.inProgress
            return inProgress
        }
        catch (error) {
            console.log(error.message)
        }
    }

    pasarPDFABinario = async () => {
        try {

            const fileBuffer = await fs.promises.readFile("./services/serviciosPython/documento.pdf");

            const base64String = fileBuffer.toString('base64');

            const jsonObject =
            {
                filename: "documento.pdf",
                content_type: "application/pdf",
                data: base64String
            }
            return jsonObject
        } catch (error) {
            console.error('Error reading or processing the file:', error);
        }
    }

    enviarSugerencia = async (id, sugerencia) => {
        try {
            let rta = false
            if (id, sugerencia) {
                rta = true
                const usuario = await this.model.obtenerUsuarios(id)
                const nombre = usuario.userName
                await this.nodeMailerSug.sendMail(nombre, sugerencia)
            }
            return rta
        } catch (error) {
            throw new Error(error.message)
        }
    }


    /* FALTAN LOS SIGUIENTES MÉTODOS:
        // CREAR UN ENDPOINT PARA CONSULTAR SI EL PROCESO DE LA CREACIÓN DE RESUMEN TERMINÓ.
        // PARA TRABAJAR LA TRADUCCIÓN DE LOS RESÚMENES.
        // NODEMAILER PARA LA RECUPERACIÓN DE LA CUENTA (¿Forgot your password?).
        * VALIDACIONES (EN GENERAL) - MANEJO DE ERRORES.
        // PARA OBTENER LA MINIATURA DEL VIDEO DE YOUTUBE Y VER CÓMO LA PERSISTIMOS EN LA BD
        *UN MÉTODO QUE CONVIERTA PDF A DOCX.
        *ENVIAR SUGERENCIAS
        //AGREGAR PASSWORD PROVISORIA
        //AGREGAR PROPIEDAD PROVISORIA AL CREARUSUARIO
        * EL USUARIO DEBERÁ TENER LAS SIGUIENTES PROPIEDADES:
            usuario:  {
                _id: id de mongo
                id: id nuestra
                userName: email
                passwr: contraseña
                provisoria: boolean que indicará si la passwd actual es provisoria
                inProgress: boolean que indicará si el usuario tiene un resumen en proceso o no
                config: {
                    isDark: boolean que indicará si el usuario configuró la app en Dark Mode.
                }
                inventario: [
                    resumen: {
                        idres: id del resumen
                        title: título del resumen (si no es ingresado por el usuario lo pondremos nosotros)
                        miniatura: imagen de youtube (puede ser null o en el caso de los resúmenes de texto podemos 
                            tener una imagen por defecto).
                        isFavourite: boolean que nos sirve para filtrar los resúmenes y armar listas de favoritos.
                        //esBreve: boolean que indicará si el usuario solicitó que sea breve o extenso (si o si debemos recibirlo).
                        //idioma: recibiremos un string con el idioma seleccionado (con esto haremos la traducción - si o si debemos recibirlo).
                        //conTranscripcion: boolean que nos indicará si quiere descargar la transcripción (solo en el de video - si o si debemos recibirlo).
                        //conImagenes: boolean que nos indicará si quiere descargar las imágenes (solo en el de video - si o si debemos recibirlo).
                        pdf: un objeto con el binario del PDF.
                        point: un int del 0 al 5 con el puntaje del resumen (se inicializará en 0).
                    }
                ]
            }

        * QUE DEBEMOS DEVOLVER EN EL LOGIN:
            usuario: {
                _id: 
                id:  
                userName: 
                inProgress: 
                config: {
                    isDark:
                } 
                inventario: [
                    resumen: {
                        idres: 
                        title: 
                        miniatura:
                        point:
                    }
                ]
            }
    */

}
export default Servicio
