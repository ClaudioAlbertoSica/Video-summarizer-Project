import nodemailer from 'nodemailer'

class NodeMailer {

    constructor(){
        this.msg = {
            "subject": "Writer Rabbit",
            "msg": " ha enviado la siguiente sugerencia: "
        }
    }
    
    sendMail = async (user, sugerencia) => {  

        const config =  {
        host : 'smtp.gmail.com',
        port : 587,
        secure: false,
        auth : {
            user : '2023juanmayordomo@gmail.com',
            pass : 'rtny tssw vcfv ftzs'
        },
        tls: {
            rejectUnauthorized: false //por problemas de certificado
        }
        }
        const mensaje = {
            from : 'Writer Rabbit',
            to: "direccion@falsa",
            subject : this.msg.subject,
            text : `${'El usuario ' + user + this.msg.msg + sugerencia}`

        }

        const transporte = nodemailer.createTransport(config);

        /*const info = */await transporte.sendMail(mensaje);

        //console.log(info);
    }
}

export default NodeMailer;
