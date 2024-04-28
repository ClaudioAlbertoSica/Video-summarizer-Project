import express from 'express'
import RouterUsuario from './router/users.js'
//import RouterRes from './router/resumen.js'
import CnxMongoDB from './models/connection/mongodb.js'
import cors from 'cors'


class Server {
    constructor(port, persistencia) {
        this.port = port
        this.persistencia = persistencia
        this.app = express()
        this.server = null
    }

    async start() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.static('public'))
        this.app.use('/api', new RouterUsuario(this.persistencia).start())
        if (this.persistencia == 'MONGODB') {
            await CnxMongoDB.conectar()
        }
        const PORT = this.port

        this.server = this.app.listen(PORT, () => { console.log(`SERVIDOR EXPRESS ESCUCHANDO EN http://localhost:${PORT}`) })
        this.server.on('Error', (error) => { console.log(`ERROR EN SERVIDOR: ${error.message}`) })
        return this.app

    }

    async stop() {
        if (this.server) {
            this.server.close()
            await CnxMongoDB.desconectar()
            this.server = null
        }
    }

    //FALTA CONEXION BD

}


export default Server