import sys
import google.generativeai as genai


APIkey  = "AIzaSyAgMBH_nlI8pg7QTS1abBMWlh_9ZqFq7YY"
APIurl = "https://ai.google.dev/api/rest#service:-generativelanguage.googleapis.com"

def armarResumen(texto, esBreve, idioma):
    if (esBreve == 1):
        print('Es breve!')
        petition = "Hola! Por favor: dado el siguiente texto: " +texto+" me podrías generar un breve resumen en " + idioma + " acerca de que trata el texto? gracias!"
    else:
        print('No es breve!')
        petition = "Hola! Por favor: dado el siguiente texto: " +texto+" me podrías generar un resumen completo y extenso en " + idioma + " acerca de que trata el texto? Por favor, intenta evitar caracteres especiales que puedan romper el string. Gracias! Por favor, que tenga una extensión de mas de 2500 caracteres"
    

    genai.configure(api_key=APIkey)
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(petition)
    with open("./services/serviciosPython/textoSalida.txt", "w", encoding='utf-8') as f:
        f.write(response.text)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python script_name.py <esBreve>")
        sys.exit(1)

    esBreve = sys.argv[1]
    idioma = sys.argv[2]

    ##print('esto vale esBreve:' + esBreve)

  
    esBreve = int(esBreve)
    idioma = int(idioma)

    match idioma:
        case 0:
            idioma = 'ingles'
        case 1:
            idioma = 'castellano'
        case 2:
            idioma = 'frances'


    ##print(type(esBreve))

    with open('./services/serviciosPython/textoEntrada.txt', 'r', encoding='utf-8') as file:
        lines = file.readlines()
        texto = ''.join(lines)
    
    
    armarResumen(texto,esBreve, idioma)
    
    
    
    
    