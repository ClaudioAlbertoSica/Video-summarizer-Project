import nodemailer from 'nodemailer'

class NodeMailer {

    constructor(){
        this.msg = {
            "subject": "Writer Rabbit - Envío de resumen",
            "msg": "Hola te dejamos adjunto el resumen que solicitaste! ",
        }
    }
    
    sendMail = async (destinatario, pdfBase64) => {  

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
            text : `${this.msg.msg}`,
            attachments: [
                {
                filename: 'resumen.pdf',
                content: pdfBase64,
                encoding: 'base64'
                }
            ]

        }

        const transporte = nodemailer.createTransport(config);

        /*const info = */await transporte.sendMail(mensaje);

        //console.log(info);
    }
}

export default NodeMailer;
