import base64
import json

def pdf_to_base64(file_path):
    with open(file_path, "rb") as file:
        binary_data = file.read()
        base64_data = base64.b64encode(binary_data)
        return base64_data.decode("utf-8")

pdf_file_path = "./services/serviciosPython/documento.pdf"

pdf_base64 = pdf_to_base64(pdf_file_path)

pdf_info = {
    "filename": "documento.pdf",
    "content_type": "application/pdf",
    "data":pdf_base64
}

def write_json_to_file(pdf_info, ruta):
    with open(ruta, "w") as file:
        json.dump(pdf_info,file,indent=4)

write_json_to_file(pdf_info, "./services/serviciosPython/jsonPDF.json")