import sys
import google.generativeai as genai


APIkey  = "AIzaSyAgMBH_nlI8pg7QTS1abBMWlh_9ZqFq7YY"
APIurl = "https://ai.google.dev/api/rest#service:-generativelanguage.googleapis.com"

def armarResumen(texto):
    ##petitionShort = "Hola! Por favor: dado el siguiente texto: " +texto+" me podrías generar un breve resumen acerca de que trata el texto? Por favor, devolvemelo en forma de JSON con dos atributos: 1 que sea subject: identifica el tema del que habla el texto, y otro atributo que sea summary: que sea el resumen que te estoy pidiendo. Gracias!"
    petitionShort = "Hola! Por favor: dado el siguiente texto: " +texto+" me podrías generar un breve resumen acerca de que trata el texto? gracias!"
    petitionLong = "Hola! Por favor: dado el siguiente texto: " +texto+" me podrías generar un resumen completo y extenso acerca de que trata el texto? Por favor, intenta evitar caracteres especiales que puedan romper el string. Gracias!"
    ##petitionLong = "Hola! Por favor: dado el siguiente texto: " +variableTranscript+" me podrías generar un breve resumen acerca de que trata el texto? para darte contexto, esto es una transcripción de un video. Por favor, devolvemelo en forma de JSON con dos atributos: 1 que sea subject: identifica el tema del que habla el texto, y otro atributo que sea summary: que sea el resumen que te estoy pidiendo"

    genai.configure(api_key=APIkey)

    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(petitionLong)

    with open("./services/serviciosPython/textoSalida.txt", "w", encoding='utf-8') as f:
        f.write(response.text)

if __name__ == "__main__":

    with open('./services/serviciosPython/textoEntrada.txt', 'r', encoding='utf-8') as file:
        lines = file.readlines()
        texto = ''.join(lines)
    
    
    armarResumen(texto)
    
    
    
    
    