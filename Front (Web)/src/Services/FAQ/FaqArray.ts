export type FAQItem = {
    question: string,
    answersContent: string,
}

export const FaqArray:FAQItem[] =  [
    {
        question: '¿Qué hace "Writer Rabbit"?',
        answersContent: 'Nuestra aplicación permite resumir contenido de manera rápida y eficiente. Podrás solicitar resúmenes escritos tanto de videos de Youtube como de textos.'
    },
    {
        question: '¿Cómo puedo solicitar resúmenes de contenido?',
        answersContent: 'Ingresa con tu usuario y contraseña.\nSelecciona el tipo de contenido que desees resumir.\nPuedes pedir resúmenes de texto simplemente copiando y pegando el contenido en el área designada de nuestra aplicación.\nPara resúmenes de videos de YouTube, solo necesitas ingresar el enlace del video.\nLuego, elige entre obtener un resumen extenso o breve, según tus preferencias.',
    },
    {
        question: '¿Puedo personalizar mis preferencias para los resúmenes?',
        answersContent: '¡Por supuesto! En nuestra aplicación, puedes personalizar tus preferencias para los resúmenes de varias formas. Puedes elegir entre obtener un resumen extenso o breve, seleccionar el idioma (inglés, español, francés o portugués) y colocarle un título.',
    },
    {
        question: '¿Qué tan preciso es el resumen generado por la aplicación?',
        answersContent: 'Nos esforzamos por brindar resúmenes precisos y relevantes. Nuestra tecnología utiliza inteligencia artificial para identificar y condensar la información esencial del contenido original. Así, obtenemos resúmenes de calidad sin perder lo importante. De todos modos, puedes proporcionar feedback sobre la calidad del resumen mediante un puntaje del 1 al 5, lo que nos ayuda a mejorar continuamente.',
    },
    {
        question: '¿Hay algún límite en la duración del video que puedo resumir?',
        answersContent: 'Actualmente tenemos un límite de duración del video a resumir, que es de un máximo de 5 minutos por el momento.',
    },
    {
        question: '¿Cómo puedo contactar al soporte técnico de la aplicación si tengo algún problema o pregunta?',
        answersContent: 'Si necesitas ayuda o tienes alguna pregunta, nuestro equipo de soporte técnico está aquí para ayudarte. Puedes contactarnos utilizando a través de nuestra sección de COMENTARIOS Y SUGERENCIAS',
    }
]



