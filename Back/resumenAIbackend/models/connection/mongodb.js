import { MongoClient } from 'mongodb'
import Config from '../../config.js'


class CnxMongoDB {


    static client = null
    static connected = false
    static db = null

    static conectar = async () => {
        try {
            console.log('estableciendo conexión con la base de datos...')

            CnxMongoDB.client = new MongoClient(Config.MONGO_STRCNX) // rompe aca

            await CnxMongoDB.client.connect()

            console.log('base de datos conectada correctamente')
    
            CnxMongoDB.db = CnxMongoDB.client.db(Config.MONGO_BD)
    
            CnxMongoDB.connected = true
        } catch (error) {
            console.log(error.message)
        }



    }

    static desconectar = async () => {
        try {
            if (!CnxMongoDB.connected) return
            await CnxMongoDB.client.close()
            CnxMongoDB.connected = false
        } catch (error) {
            console.log(error.message)
        }
    }



}


export default CnxMongoDB





