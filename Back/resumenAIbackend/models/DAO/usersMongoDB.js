//import { resume } from "pdfkit";
import CnxMongoDB from "../connection/mongodb.js"
import fs from 'fs'

class ModelMongoDB {
    //VER EN SERVICES - USERS.JS LO QUE NECESITAMOS DEVOLVER DEL USUARIO!
    obtenerUsuariosLogin = async (userName) => {
        try {
            if (userName) {
                const usuarioEncontrado = await CnxMongoDB.db.collection('usuarios').findOne({userName: userName});
                if (usuarioEncontrado) {
                    // Remove the paragraph array from each item in the inventario array
                    usuarioEncontrado.inventario.forEach(item => delete item.pdf);
                }
                return usuarioEncontrado || {};
            } else {
                const usuariosEncontrados = await CnxMongoDB.db.collection('usuarios').find({}).toArray();
                // Remove the paragraph array from each item in the inventario array
                usuariosEncontrados.forEach(usuario => {
                    usuario.inventario.forEach(item => delete item.pdf);
                });
                return usuariosEncontrados;
            }
        } catch {
            throw new Error('conexion con la BD no establecida');
        }
    };

    // REVISAR (creo que está OK)
    obtenerUsuarios = async (id) => {

        try {
            if (id) {
            const usuarioEncontrado = await CnxMongoDB.db.collection('usuarios').findOne({id:id})
            return usuarioEncontrado || {}
            } else {
                return await CnxMongoDB.db.collection('usuarios').find({}).toArray()
            }
        }
        catch {
            throw new Error('conexion con la BD no establecida')
        }
    }

// REVISAR (Creo que está ok, a lo sumo del lado del servicio redirigir a la pagina del login en vez de devolver el usuario)
    guardarUsuario = async (usuario) => {
        try {
            const existe = await CnxMongoDB.db.collection('usuarios').findOne({userName: usuario.userName})
            const usuarios = await CnxMongoDB.db.collection('usuarios').find({}).toArray()
            if (!existe) {
                if (usuario.userName && usuario.passwd) {
                    usuario.id = String(parseInt(usuarios[usuarios.length - 1]?.id || 0) + 1)
                    usuario.userName = String(usuario.userName)
                    usuario.passwd = String(usuario.passwd)
                    usuario.inventario = []
                    usuario.inProgress = false
                    usuario.config = {
                        isDark:false
                    }
                    await CnxMongoDB.db.collection('usuarios').insertOne({...usuario})
                    return await CnxMongoDB.db.collection('usuarios').findOne({userName: usuario.userName})
                } else {
                    throw new Error('Faltan datos para completar la solicitud.');
                }
            } else {
                throw new Error('Usuario existente. Por favor, iniciar sesión.');
            }
        }
        catch (error) {
            throw error;
        }
    }

    //FUNCIONA OK PARA CAMBIAR CONTRASEÑA!
    /*
    actualizarUsuario = async (id, usuario) => {
        try {
            const usuarioActual = await CnxMongoDB.db.collection('usuarios').findOne({ id: id });
            let usuarioModificado;
    
            if (usuarioActual) {
                if (usuario.inventario) {

                    const inventarioSet = new Set(usuarioActual.inventario.map(item => JSON.stringify(item)));
                    usuario.inventario.forEach(item => inventarioSet.add(JSON.stringify(item)));
                    const inventarioMerged = Array.from(inventarioSet).map(item => JSON.parse(item));
    
                    usuarioModificado = { ...usuarioActual, ...usuario, inventario: inventarioMerged };
                } else {
                    usuarioModificado = { ...usuarioActual, ...usuario };
                }
    
                await CnxMongoDB.db.collection('usuarios').replaceOne({ id: id }, usuarioModificado);
                return await CnxMongoDB.db.collection('usuarios').findOne({ id: id });
            } else {
                return {};
            }
        } catch (error) {
            console.error("Database connection error:", error);
            throw new Error('conexion con la BD no establecida');
        }
    };*/

    actualizarUsuario = async (id, usuario) => {

        try {
            const usuarioActual = await CnxMongoDB.db.collection('usuarios').findOne({ id: id });

            if (!usuarioActual) {
                console.error(`User with id ${id} not found`);
                return {};
            }

            let usuarioModificado;
            if (usuario.inventario) {
                const inventarioSet = new Set(usuarioActual.inventario.map(item => JSON.stringify(item)));
                usuario.inventario.forEach(item => inventarioSet.add(JSON.stringify(item)));
                const inventarioMerged = Array.from(inventarioSet).map(item => JSON.parse(item));

                usuarioModificado = { ...usuarioActual, ...usuario, inventario: inventarioMerged };
            } else {
                usuarioModificado = { ...usuarioActual, ...usuario };
            }

            await CnxMongoDB.db.collection('usuarios').replaceOne({ id: id }, usuarioModificado);
            const usuarioActualizado = await CnxMongoDB.db.collection('usuarios').findOne({ id: id });
            return usuarioActualizado
        } catch (error) {
            console.error("Database connection error:", error);
            throw new Error('Database connection not established')
            
        }

    };

/*
    actualizarUsuario = async (id, usuario) => {
        try {
            const usuarioActual = await CnxMongoDB.db.collection('usuarios').findOne({ id: id });
    
            if (!usuarioActual) {
                console.error(`User with id ${id} not found`);
                return {};
            }
    
            const updateFields = {};
            if (usuario.inProgress !== undefined) updateFields.inProgress = usuario.inProgress;
            if (usuario.passwd !== undefined) updateFields.passwd = usuario.passwd;
            if (usuario.config !== undefined) updateFields.config = usuario.config;
    
            await CnxMongoDB.db.collection('usuarios').updateOne(
                { id: id },
                { $set: updateFields }
            );
    
            const usuarioActualizado = await CnxMongoDB.db.collection('usuarios').findOne({ id: id });
            return usuarioActualizado;
        } catch (error) {
            console.error("Database connection error:", error);
            throw new Error('Database connection not established');
        }
    };
*/


    //REVISAR  (Creo que está ok)
    borrarUsuario = async (id) => {
        try {
            const usuarioEncontrado = await CnxMongoDB.db.collection('usuarios').findOne({id:id})
            if (usuarioEncontrado) {
                await CnxMongoDB.db.collection('usuarios').deleteOne(usuarioEncontrado)
            }
            return usuarioEncontrado
        }
        catch {
            throw new Error('conexion con la BD no establecida - LLAMAR A CLAUDIO')
        }
    }

    //REVISAR (Creo que funciona ok pero no sé si lo estamos usando, antes lo usabamos en el login pero
    // la diferencia es que este devuelve el usuario entero - Tal vez podemos usarlo dentro del método obtenerUsuariosLogin)
    obtenerUserPorNombre = async (userName) => {
        try {
            const usuarioEncontrado = await CnxMongoDB.db.collection('usuarios').findOne({userName:userName})
            return usuarioEncontrado || {}     
        }
        catch {
            throw new Error('conexion con la BD no establecida - LLAMAR A CLAUDIO')
        }
    }

    //REVISAR (Creo que funciona OK pero acá devuelve el resumen completo, tal vez podemos hacer que no devuelva algunas cosas
    // como los booleans del idioma o esBreve, tal vez el de transcripción e imágenes si por si llegamos a persistirlas en mongo
    // y quieran descargarlas en un futuro).
    obtenerResumenes = async (id, idres) => {
        try {
            if (id) {
            const usuarioEncontrado = await CnxMongoDB.db.collection('usuarios').findOne({id:id})
            if (usuarioEncontrado && idres) {
                const resumenesAux = usuarioEncontrado.inventario
                const index = resumenesAux.findIndex(resumen => resumen.idres === idres)
                if (index != -1) {
                    return resumenesAux[index]
                } else {
                    console.log('no existe resumen con ese ID')
                }
            } else {
                const resumenes = usuarioEncontrado.inventario
                return resumenes 
            }
            } else {
                console.log('no hay id de usuario especificado')
            }
        }
        catch {
            throw new Error('conexion con la BD no establecida')
        }
    }

    //REVISAR (Creo que funciona OK)
    borrarResumen = async (id, idres) => {
        try {
            let resumenEliminado = {}
            if (id) {
            const usuarioEncontrado = await CnxMongoDB.db.collection('usuarios').findOne({id:id})
            if (usuarioEncontrado && idres) {
                const resumenesAux = usuarioEncontrado.inventario
                const index = resumenesAux.findIndex(resumen => resumen.idres === idres)
                if (index != -1) {
                    resumenEliminado = resumenesAux.splice(index, 1)[0]                   
                
                    await CnxMongoDB.db.collection('usuarios').updateOne(
                        { id: id },
                        { $pull: { inventario: { idres:idres } } }
                    );

                    return resumenEliminado
                } else {
                    console.log('no existe resumen con ese ID')
                }
                return result
            } 
            } else {
                console.log('no hay id de usuario especificado')
            }
        }
        catch {
            throw new Error('conexion con la BD no establecida')
        }
    }

    //REVISAR (Creo que funciona OK, al menos para cambiar el puntaje)
    actualizarResumen = async (id, idres, nuevoResumen) => {
        try {
            if (id) {
                const usuarioEncontrado = await CnxMongoDB.db.collection('usuarios').findOne({id: id});
                if (usuarioEncontrado && idres) {
                    const resumenesAux = usuarioEncontrado.inventario;
                    const index = resumenesAux.findIndex(resumen => resumen.idres === idres);
                    if (index !== -1) {
                        const resumenActualizado = {...resumenesAux[index], ...nuevoResumen};
                        await CnxMongoDB.db.collection('usuarios').updateOne(
                            { id: id, "inventario.idres": idres },
                            { $set: { "inventario.$": resumenActualizado } }
                        );
                        return nuevoResumen; 
                    } else {
                        console.log('No existe resumen con ese ID');
                        return null; 
                    }
                } else {
                    console.log('No hay ID de usuario especificado o ID de resumen');
                    return null; 
                }
            } else {
                console.log('No hay ID de usuario especificado');
                return null; 
            }
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Conexión con la BD no establecida o error al actualizar el resumen');
        }
    }

    guardarResumenNuevo = async (id, nuevoResumen) => {
        try {
            if (id) {
                const usuarioEncontrado = await CnxMongoDB.db.collection('usuarios').findOne({ id: id });
                if (usuarioEncontrado) {
                    const resumenesAux = usuarioEncontrado.inventario || [];
                    const idres = String(parseInt(resumenesAux[resumenesAux.length - 1]?.idres || 0) + 1);
                    nuevoResumen.idres = idres
                    resumenesAux.push(nuevoResumen);
                    await CnxMongoDB.db.collection('usuarios').updateOne(
                        { id: id },
                        { $set: { inventario: resumenesAux } }
                    );

                    return nuevoResumen;
                } else {
                    console.log('No existe usuario con ese ID');
                    return null;
                }
            } else {
                console.log('No hay ID de usuario especificado');
                return null;
            }
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Conexión con la BD no establecida o error al guardar el nuevo resumen');
        }
    };


    //FALTA RECIBIR PDF EN BINARIO Y AGREGAR LAS PROPIEDADES QUE NO SE 
    //HAYAN AGREGADO EN EL SERVICIO PARA GUARDAR TODO EN LA BASE DE DATOS.
    //ACTUALIZAR USUARIO GUARDA MAL LOS RESUMENES 
    crearResumenTexto = async (id, resumen) => {
        
        try {
                console.log('Entering model method');
            
                /*const rutaSalidaBinario = './services/serviciosPython/jsonPDF.json';
                console.log('Reading binary file');

                let binarioAPasar = await fs.promises.readFile(rutaSalidaBinario, 'utf-8');
                console.log('Binary file read successfully');

                binarioAPasar = await JSON.parse(binarioAPasar)

                resumen.pdf = binarioAPasar*/
                const resumenNuevo = await this.guardarResumenNuevo(id, resumen)
                return resumenNuevo
        } catch(error) {

        }
    }

    crearResumenVideo = async (id, resumenVid) => {
            try {

                console.log('Entering model method');
                /*
                const rutaSalidaBinario = './services/serviciosPython/jsonPDF.json';
                console.log('Reading binary file');
    
                let binarioAPasar = await fs.promises.readFile(rutaSalidaBinario, 'utf-8');
                console.log('Binary file read successfully');
    
                binarioAPasar = await JSON.parse(binarioAPasar)

                resumenVid.pdf = binarioAPasar*/

                const resumenNuevo = await this.guardarResumenNuevo(id, resumenVid);

                console.log('guarde el resumen :)');

                
    
                return resumenNuevo;
            } catch (error) {
                console.error('Error in crearResumenVideo:', error);
                throw error;
            }
        }



}


export default ModelMongoDB
