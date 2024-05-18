import os
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Image, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from PIL import Image as PILImage

def create_pdf(image_folder, text_file, output_pdf):
    # Create a PDF document
    doc = SimpleDocTemplate(output_pdf, pagesize=letter)
    story = []
    styles = getSampleStyleSheet()
    spacer = Spacer(1, 12)  # Add a small space between elements
    
    # Read the text from the text file
    with open(text_file, 'r', encoding='utf-8') as file:
        text = file.read()
    
    # Split the text into paragraphs
    paragraphs = text.split('\n\n')
    
    # Get the list of images from the specified directory
    images = sorted([os.path.join(image_folder, img) for img in os.listdir(image_folder)
                     if img.lower().endswith(('png', 'jpg', 'jpeg', 'gif'))])
    
    # Alternate between paragraphs and images, handle no images case
    for i, paragraph in enumerate(paragraphs):
        story.append(Paragraph(paragraph, styles['Normal']))
        story.append(spacer)
        
        if i < len(images):
            try:
                with PILImage.open(images[i]) as img:
                    width, height = img.size
                    aspect_ratio = width / height
                    if width > 500:  # Resize if the width is too large
                        width = 300
                        height = width / aspect_ratio
                    elif height > 700:  # Resize if the height is too large
                        height = 350
                        width = height * aspect_ratio
                story.append(Image(images[i], width, height))
                story.append(spacer)
            except Exception as e:
                print(f"Error adding image {images[i]}: {e}")
    
    # Build the PDF
    doc.build(story)

# Define paths
capturas = './services/serviciosPython/capturas/'
texto = './services/serviciosPython/resumenSalida.txt'
output_pdf = './services/serviciosPython/documento.pdf'

# Create the PDF
create_pdf(capturas, texto, output_pdf)
