
class ModelMemory {
    constructor() {
        this.usuarios = [
            {
                id:'1',userName:'Rocio',passwd:'123', inventario:[] 
            },
            {
                id:'2',userName:'Clau',passwd:'p3p3', inventario:[]
            },
            {
                id:'3',userName:'Marian',passwd:'222', inventario:[]
            },
            {
                id:'4',userName:'Dani',passwd:'321', inventario:[]
            },
            {
                id:'5',userName:'Juan',passwd:'p3p3', inventario:[]
            },
        ]
    }

    obtenerUsuarios = async (id) => {
        try {
            if (id) {
                const usuario = this.usuarios.find(usuario => usuario.id === id)
                return usuario || {}
            } else {
                return this.usuarios
            }
        }
        catch(error) {
            console.log(error.message)   
        }
    }

    guardarUsuario = async (usuario) => {
        try {
            usuario.id = String(parseInt(this.usuarios[this.usuarios.length - 1]?.id || 0) + 1)
            this.usuarios.push(usuario)
            return usuario
        }
        catch(error) {
            console.log(error.message)
        }
    }

    actualizarUsuario = async (id, usuario) => {
        try {
           usuario.id = id
           const index = this.usuarios.findIndex(usuario => usuario.id === id)
           if (index != -1) {
                const usuarioAnt = this.usuarios[index]
                const usuarioNuevo = {...usuarioAnt, ...usuario}
                this.usuarios.splice(index, 1, usuarioNuevo)
                return usuarioNuevo
           } else {
                this.usuarios.push(usuario)
                return usuario
           }
        }
        catch(error) {
            console.log(error.message)
        }
    }

    borrarUsuario = async (id) => {
        let usuario = {}
        try {
            const index = this.usuarios.findIndex(usuario => usuario.id === id)
            if (index != -1) {
                usuario = this.usuarios.splice(index, 1)[0]
            } 
            return usuario
        }
        catch(error) {
            console.log(`Error en model ${error.message}`)
        }
    }


    obtenerUserPorNombre = async (userName) => {
        try {
            let usuarioEncontrado = {};
            const index = this.usuarios.findIndex(usuario => usuario.userName === userName);
            if (index !== -1) {
                usuarioEncontrado = this.usuarios[index];
            }
            return usuarioEncontrado;
        }
        catch {
            throw new Error('conexion con la BD no establecida - LLAMAR A CLAUDIO');
        }
    }

    
}

export default ModelMemory
