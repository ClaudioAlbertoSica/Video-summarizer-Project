import os
import shutil
import google.generativeai as genai #Hubo que instalar el generative AI de google
import PIL.Image #instalé Pillow library
import re
import sys
##import spacy
import numpy as np


###PREREQUISITOS: CAPTURAS Y TRANSSCRIPT YA OBTENIDOS
safety_settings = [
    {
        "category": "HARM_CATEGORY_DANGEROUS",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_NONE",
    },
]

##PEDIR APIKEYS (FALTA RESOLVER ESTE TEMA)
APIkey  = ""
APIurl = ""




###SACO RESUMEN DEL TRASNCRIPT
def armarResumen(texto, esBreve, idioma):
    if (esBreve == 1):    
        petition = "Hola! Por favor: dado el siguiente texto: " +texto+" me podrías generar un breve resumen en " + idioma +  " de lo que trata el texto? Es la transcripcion de un video, y quiero un resumen apto para facilitarle la vida a un estudiante"
    else:
        petition = "Hola! Por favor: dado el siguiente texto: " +texto+" me podrías generar un resumen completo y detallado " + idioma + " de lo que trata el texto? Es la transcripcion de un video, y quiero un resumen apto para facilitarle la vida a un estudiante. Por favor, no escatimes en tecnicismos y explicaciones profundas del tema. Necesito que el resumen tenga una carilla de longitud un poco más de 2000 caracteres"
    genai.configure(api_key=APIkey)
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(petition)

    with open("./services/serviciosPython/resumenSalida.txt", "w", encoding= "utf-8") as f:
        f.write(response.text)








##OBTENGO ARRAY CON CADA UNA DE LAS CAPTURAS / SUS RUTAS
def get_png_files(directory):
    png_files = []
    for file in sorted(os.listdir(directory), key=lambda x: int(os.path.splitext(x)[0])):
        if file.endswith(".png"):
            png_files.append(directory + '/' + file)
    return png_files




##HACE CAPTION A CADA UNA DE LAS CAPTURAS
def captionarCapturas(rutasCapturas):
    rtasDef = []
    for i in rutasCapturas:
        objetoIm = PIL.Image.open(i)
        genai.configure(api_key=APIkey)
        model = genai.GenerativeModel('gemini-pro-vision')
        petition = "hi, i'm sending you two parameters:  this petition, and an image, please give me a brief and concise description of the image in text. To give you some context, the image is a screenshot from a video" ##este funciona
        requestContent = [petition, objetoIm]
        response = model.generate_content(requestContent, safety_settings=safety_settings)
        rtasDef.append(response.text)
    ##print(rtasDef)
    return rtasDef


##COMPARO CADA UNO DE LOS CAPTIONS CON EL RESUMEN ARMADO PREVIAMENTE
def compararCapturasCResumen(arrCaptions, resumen):
    rankingCaptions = []

    for i in arrCaptions:
        genai.configure(api_key=APIkey)
        model = genai.GenerativeModel('gemini-pro')
        petition = "hi, i'm sending you two parameters:  a caption and a full length text summary. Can you rank the relation or importance this caption would mean to the full text? please just reply with a number between 1 (bad caption) to 10 (excellent caption)" ##este funciona
        requestContent = [petition, i,resumen]
        response = model.generate_content(requestContent, safety_settings=safety_settings)
        rankingCaptions.append(response.text)
    return rankingCaptions




##print(arrComparacion)

def extract_numbers(array):
    numbers = []
    for string in array:

        matches = re.findall(r'\b\d+\b', string)

        numbers.extend(matches)
    return numbers




##CONVIERTO ARR A INT
def convertirArrInt(arrStr):
    arrInt = []
    for i in arrStr:
        arrInt.append(int(i))
    return arrInt



def seleccionarCapturasRankeadas(arrCap, arrEval):
    capturasDEF = []
    cont = 0
    prom = np.mean(arrEval)
    for i in arrEval:        
        if int(i) > prom + 1:
            capturasDEF.append(arrCap[cont])
        cont += 1

    if len(capturasDEF) > 4:
        middle_index = len(capturasDEF) // 2
        capturasDEF = capturasDEF[:middle_index] + capturasDEF[middle_index + 1:]
    
    return capturasDEF




##print(capturasDefinitivas)


##BORRO CAPTURAS QUE NO ME SIRVEN
def delete_except(paths, ruta):
    folder_path = ruta
    ##print(folder_path)
    # Get list of all PNG files in the folder
    png_files = [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f)) and f.lower().endswith('.png')]
    # Convert paths to set for faster lookup
    paths_set = set(paths)
    for file_name in png_files:
        if os.path.join(folder_path, file_name) not in paths_set:
            os.remove(os.path.join(folder_path, file_name))





if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("FALTAN PARAMETROS")
        sys.exit(1)

    esBreve = sys.argv[1]
    idioma = sys.argv[2]

    esBreve = int(esBreve)
    idioma = int(idioma)

    match idioma:
        case 0:
            idioma = 'ingles'
        case 1:
            idioma = 'castellano'
        case 2:
            idioma = 'frances'
        case 3:
            idioma = 'hebreo'
        case 4:
            idioma = 'portugues'

    ##ACA DEBERIA IR EL TRANSCRIPT
    with open('./services/serviciosPython/transcripcion.txt', 'r', encoding='utf-8') as file:
        lines = file.readlines()
        texto = ''.join(lines)

    armarResumen(texto, esBreve, idioma)

    directory = "./services/serviciosPython/capturas"
    rutasCapturas = get_png_files(directory)

    ##LEE EL RESUMEN ARMADO PREVIAMENTE Y LO METE EN textoS
    with open('./services/serviciosPython/resumenSalida.txt', 'r', encoding='utf-8') as file:
        lines = file.readlines()
        textoS = ''.join(lines)


    descrCapturas = captionarCapturas(rutasCapturas)

    arrComparacion = compararCapturasCResumen(descrCapturas, textoS)
    

    arrComparacionLimpio = extract_numbers(arrComparacion)

    arrInteger = convertirArrInt(arrComparacionLimpio)

    capturasDefinitivas = seleccionarCapturasRankeadas(rutasCapturas, arrInteger)

    rutaCapturas = './services/serviciosPython/capturas/'
    delete_except(capturasDefinitivas, rutaCapturas)