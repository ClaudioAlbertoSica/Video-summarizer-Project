import Server from "./server.js"
import config from "./config.js"

new Server(config.PORT, config.PERSISTENCIA).start() 
