import CnxMongoDB from "../connection/mongodb.js"


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

    //ARREGLAR EL TEMA DE LA ACTUALIZACIÓN DE INVENTARIO, PARA AGREGAR UN RESUMEN NUEVO
    //FUNCIONA OK PARA CAMBIAR CONTRASEÑA!
    actualizarUsuario = async (id, usuario) => {
        try {
            const usuarioActual = await CnxMongoDB.db.collection('usuarios').findOne({id:id})
            let usuarioModificado
            if (usuarioActual) {
                if (usuario.inventario) {
                    usuarioModificado = {...usuarioActual, ...usuario, inventario:[...usuarioActual.inventario,...usuario.inventario]}

                } else {
                    usuarioModificado = {...usuarioActual, ...usuario}
                }
                await CnxMongoDB.db.collection('usuarios').replaceOne({id:id},({...usuarioModificado}))
                return await CnxMongoDB.db.collection('usuarios').findOne({id:usuarioModificado.id})
            } else {
                return {}
            }
        }
        catch {
            throw new Error('conexion con la BD no establecida')
        }
    }

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

    //FALTA RECIBIR PDF EN BINARIO Y AGREGAR LAS PROPIEDADES QUE NO SE 
    //HAYAN AGREGADO EN EL SERVICIO PARA GUARDAR TODO EN LA BASE DE DATOS.
    //ACTUALIZAR USUARIO GUARDA MAL LOS RESUMENES 
    crearResumenTexto = async (id, resumen) => {
        const usuario =  await this.obtenerUsuarios(id)
        const inventario = usuario.inventario
        resumen.idres = String(parseInt(inventario[inventario.length - 1]?.id || 0) + 1)
        inventario.push(resumen)
        await this.actualizarUsuario(id, {inventario: inventario})
        const resumenNuevo = await this.obtenerResumenes(id, idres)
        return resumenNuevo
    }



}


export default ModelMongoDB
