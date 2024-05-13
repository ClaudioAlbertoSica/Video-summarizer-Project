import Factory from '../models/DAO/modelFactory.js'
import { exec } from 'child_process'
//import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg'; NO BORRAR, VER RUTAS DE FFMPEG
import fs from 'fs'
import PDFDocument from 'pdfkit';
class Servicio {
    constructor(persistencia) {
        this.model = Factory.get(persistencia)
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

    //Finalizado
    guardarUsuario = async (usuario) => {
        try {
            const usuarioGuardado = await this.model.guardarUsuario(usuario)
            return usuarioGuardado
        }
        catch (error) {
            console.log(error.message)
        }
    }

    //A REVISAR EN LA PARTE DE MODEL (CUANDO LE PASAMOS UN RESUMEN NOS AGREGABA MUCHOS IGUALES)
    actualizarUsuario = async (id, usuario) => {
        try {
            const usuarioActualizado = this.model.actualizarUsuario(id, usuario)
            return usuarioActualizado
        }
        catch (error) {
            console.log(error.message)
        }
    }

    //Finalizado
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


    //REVISAR UNA VEZ QUE TENGAMOS LOS PDF PERSISTIDOS
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

    //FALTA COLOCARLE UN PARÁMETRO URL QUE RECIBA EL LINK DE YOUTUBE DESDE EL OTRO MÉTODO.
    //FALTA RESOLVER TEMA LINKS DE YOUTBE CON CARACTER &
    //LLAMAMOS A LOS DOS SCRIPTS PY PARA PROCESAR VIDEO
    runPythonVideo = async () => {
        //let urlVideo = 'https://www.youtube.com/watch?v=nJPQDyw9YXI'

        console.log('entre al script')
        const pythonScriptPath = './services/serviciosPython/procesarVideo.py';
        const command = `python ${pythonScriptPath} ${'https://www.youtube.com/watch?v=2Xa3Y4xz8_s'}`; //VIDEO 6 MIN
        //const command = `python ${pythonScriptPath} ${urlVideo}`;


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
            })
        });
    }

    //FALTA ENVIARLE POR PARÁMETRO EL BOOL ES BREVE PARA QUE SEPAMOS SI QUIERE UN RESUMEN EXTENSO O CORTO.
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
            })
        });
    }


    //FALTA PREGUNTAR SI INGRESARON UN ID Y UNA URL (MANEJO DE ERRORES), FALTA ENCONTRAR EL USUARIO Y ACTUALIZARLO
    //FALTA AGREGARLE LAS PROPIEDADES AL RESUMEN, CONVERTIR EL PDF A BINARIO Y AGREGARLO COMO PROPIEDAD
    //FALTA ENVIARLE POR PARÁMETRO EL BOOL ES BREVE PARA QUE SEPAMOS SI QUIERE UN RESUMEN EXTENSO O CORTO.
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

    //PODEMOS REUTILIZARLO PARA TODOS LOS MÉTODOS QUE NECESITEN LEER UN ARCHIVO. SOLO DEBEMOS CREAR UN PARÁMETRO RUTA
    leerTxtSalida = async () => {
        try {
            const textoResumido = await fs.promises.readFile('./services/serviciosPython/resumenSalida.txt', 'utf-8')
            console.log('Leído:')
            console.log(textoResumido)
            return textoResumido
        } catch (error) {
            console.error('Error leyendo archivo:', error)
            throw error; 
        }
    }

    // ESTE FUNCIONA OK, SOLO SERÍA NECESARIO EN EL DE VIDEO, QUE VA A TENER IMAGENES, PARA PODER INTERCALARLAS
    // CON EL TEXTO. SI TENEMOS QUE LLEVAR LA SIGUIENTE LÍNEA AL RESUMEN DE TEXTO: texto.replace(/\r?\n/g, '\n')
    //TAL VEZ SE PUEDE MEJORAR RECIBIENDO LOS PARÁMETROS NECESARIOS (TEXTO Y NUMPARTES) Y EL LEER EL TEXTO Y OBTENER
    //EL ARRAY DE ARCHIVOS LO HACEMOS EN EL MÉTODO DE CREAR RESUMEN VIDEO DIRECTAMENTE.
    dividirTextoEnPartes = async () => {
        let texto = await this.leerTxtSalida()
        texto = texto.replace(/\r?\n/g, '\n')
        const imagenes = await this.contarArchivosEnCarpeta()
        const numPartes = imagenes.length

        
        const parrafos = texto.split('\n').filter(parrafo => parrafo.trim() !== '')

        const parrafosPorParte = Math.ceil(parrafos.length / numPartes)

        const partes = []
        //TAL VEZ DEBERÍA PREGUNTAR SI TIENE UN SOLO ÍTEM?
        if(!imagenes.isEmpty){
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
        }else{
            partes = texto
        }
        await this.generarPDF(partes, imagenes)
        console.log(partes)
        return partes
    }

    //ESTE CREO QUE ESTÁ OK (NO CREO QUE HAGA FALTA MODULARIZAR PORQUE LA ÚNICA RUTA QUE NECESITAMOS REVISAR SIEMPRE
    // VA A SER LA DE CAPTURAS). ESTA DEVUELVE UN ARRAY DE STRINGS CON LAS RUTAS DE LAS IMÁGENES.
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

    //MEJORAR PARA PODER UTILIZARLA TAMBIÉN EN EL RESUMEN QUE NO TIENE IMÁGENES.
    // HACER UN IF QUE NOS PREGUNTE SI RECIBIMOS UN ARRAY DE IMÁGENES PARA HACER EL FOR, SINO
    //ARMAMOS EL DOC CON EL TEXTO QUE NOS VIENE.
    generarPDF = async (textoArray, imagenes) => {
        return new Promise((resolve, reject) => {
            const doc = new PDFDocument();
            const pdfPath = './services/serviciosPython/documento.pdf';
            const writeStream = fs.createWriteStream(pdfPath);

            doc.pipe(writeStream);
            doc.fontSize(12);
            if(!imagenes.isEmpty){
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

                    if (index < textoArray.length - 1) {
                        doc.addPage()
                    }

                }
            }else{
                doc.text(textoArray[0])
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

    //FALTA AGREGAR LA PROPIEDAD POINT.
    //FALTA RESOLVER EN TODOS LOS RESÚMENES EL TEMA DE LA TRADUCCIÓN
    crearResumenTexto = async (id, texto, esBreve, idioma, titulo) => {
        const rutaEntrada = './services/serviciosPython/textoEntrada.txt'
        const rutaSalida = './services/serviciosPython/textoSalida.txt'
        const resumen = {}
        try {
            if (id, texto, esBreve, idioma) {
                resumen.esBreve = esBreve
                resumen.idioma = idioma
                if (titulo) {
                    resumen.titulo = titulo
                } else {
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
            } else {
                console.log('error de ingreso de datos')
            }



            const resumenNuevo = await this.model.crearResumenTexto(id, resumen)

            return resumenNuevo
        } catch (error) {
            console.log(error.message)
        }
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


    /* FALTAN LOS SIGUIENTES MÉTODOS:
        * CREAR UN ENDPOINT PARA CONSULTAR SI EL PROCESO DE LA CREACIÓN DE RESUMEN TERMINÓ.
        * PARA TRABAJAR LA TRADUCCIÓN DE LOS RESÚMENES.
        * NODEMAILER PARA LA RECUPERACIÓN DE LA CUENTA (¿Forgot your password?).
        * VALIDACIONES (EN GENERAL).
        * PARA OBTENER LA MINIATURA DEL VIDEO DE YOUTUBE Y VER CÓMO LA PERSISTIMOS EN LA BD
        (SI LOGRAMOS DESCULAR ESTO PODEMOS LLEGAR A PERSISTIR EL TEXTO Y LAS CAPTURAS POR FUERA DEL PDF, TOTAL SERÍA SUMAR
        4 IMÁGENES MÁS COMO MÁXIMO).
        *SI LOGRAMOS ESTO ÚLTIMO UN MÉTODO QUE CREE UN DOCX CON ESTO, SINO UNO QUE CONVIERTA PDF A DOCX.
        * EL USUARIO DEBERÁ TENER LAS SIGUIENTES PROPIEDADES:
            usuario:  {
                _id: id de mongo
                id: id nuestra
                userName: email
                passwr: contraseña
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
                        esBreve: boolean que indicará si el usuario solicitó que sea breve o extenso (si o si debemos recibirlo).
                        idioma: recibiremos un string con el idioma seleccionado (con esto haremos la traducción - si o si debemos recibirlo).
                        conTranscripcion: boolean que nos indicará si quiere descargar la transcripción (solo en el de video - si o si debemos recibirlo).
                        conImagenes: boolean que nos indicará si quiere descargar las imágenes (solo en el de video - si o si debemos recibirlo).
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
