import nodemailer from 'nodemailer'

class NodeMailer {

    constructor(){
        this.msg = {
            "subject": "Writer Rabbit",
            "msg": "Hola: vengo a resetear tu contraseña! Por favor, utilizá esta password provisoria: "
        }
    }
    
    sendMail = async (destinatario, passwd) => {  

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
            to: destinatario,
            subject : this.msg.subject,
            text : `${this.msg.msg + passwd}`

        }

        const transporte = nodemailer.createTransport(config);

        /*const info = */await transporte.sendMail(mensaje);

        //console.log(info);
    }
}

export default NodeMailer;
