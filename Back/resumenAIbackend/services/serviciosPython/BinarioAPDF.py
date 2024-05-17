import json
import base64

# leemos json
def read_json_from_file(file_path):
    with open(file_path, "r") as file:
        data = json.load(file)
        return data

# decodificamos y guardamos pdf
def base64_to_pdf(base64_data, filename):
    binary_data = base64.b64decode(base64_data)
    with open(filename, "wb") as file:
        file.write(binary_data)

# ruta json
json_file_path = "jsonPDF.json"

# leo el json por la data
pdf_info = read_json_from_file(json_file_path)

# extraigo la data del json
base64_data = pdf_info["data"]

# nombre pdf
pdf_filename = "pdfRecuperado.pdf"

# guardo el pdf
base64_to_pdf(base64_data, pdf_filename)

print("se guardo el pdf nuevo")