import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT
const PERSISTENCIA = process.env.PERSISTENCIA //persistencia MONGODB  MEM
const MONGO_STRCNX = process.env.MONGO_STRCNX
const MONGO_BD = process.env.MONGO_BD



export default{PORT, PERSISTENCIA, MONGO_STRCNX, MONGO_BD}
