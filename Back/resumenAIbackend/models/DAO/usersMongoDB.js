import CnxMongoDB from "../connection/mongodb.js"


class ModelMongoDB {
    
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
                    console.log('Faltan datos para completar la solicitud')
                } 
            } else {
                console.log('Usuario existente. Por favor, iniciar sesión.')
            }
        }
        catch {
            throw new Error('conexion con la BD no establecida')
        }
    }

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

    obtenerUserPorNombre = async (userName) => {
        try {
            const usuarioEncontrado = await CnxMongoDB.db.collection('usuarios').findOne({userName:userName})
            return usuarioEncontrado || {}     
        }
        catch {
            throw new Error('conexion con la BD no establecida - LLAMAR A CLAUDIO')
        }
    }

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

}


export default ModelMongoDB