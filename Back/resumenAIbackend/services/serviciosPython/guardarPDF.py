'''{
    "title": "titulo Resumen",
    "file": {
    "data": "<output binario que sacamos con guardarpdf>",
    "mime_type": "application/pdf"
  }
}'''

with open('DocPDFTest.pdf', 'rb') as file:
    binary_data = file.read()

with open("DocPDFBin", "wb") as f:
    f.write(binary_data)



#print(binary_data)

