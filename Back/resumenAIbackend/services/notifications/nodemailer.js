import nodemailer from 'nodemailer'

class NodeMailer {

    constructor(){
        this.msg = {
            "subject": "MENSAJE IMPORTANTE SOBRE SU SEGURO",
            "msg": "AGUANTE BOCA"
        }
    }
    
    sendMail = async (destinatario) => {  

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
            from : 'Resumenes AI',
            to: destinatario,
            subject : this.msg.subject,
            text : `${this.msg.msg}`

        }

        const transporte = nodemailer.createTransport(config);

        /*const info = */await transporte.sendMail(mensaje);

        //console.log(info);
    }
}

export default NodeMailer;
