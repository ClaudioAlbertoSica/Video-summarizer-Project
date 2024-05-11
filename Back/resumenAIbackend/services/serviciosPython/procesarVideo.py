import math
from pytube import YouTube
from moviepy.editor import VideoFileClip
import os
import time
import sys
import whisper


def descargaVideoYT(url, rutaDestino):
    global tituloVideo
    video = YouTube(url)
    tituloVideo = 'videoTest.mp4'
    if not os.path.isfile('./services/serviciosPython/videoTest.mp4'):
        stream = video.streams.get_by_itag(22)
        if stream is None:
            stream = video.streams.filter(progressive=True, file_extension='mp4').order_by('resolution').desc().first()
        stream.download(rutaDestino)
    else:
        print('ya existe video')

def cambiarNombre(directorio_ruta):
    files = os.listdir(directorio_ruta)
    mp4_files = [file for file in files if file.endswith(".mp4")]
    if len(mp4_files) == 1:
        old_file_name = mp4_files[0]
        new_file_name = "videoTest.mp4"
        os.rename(os.path.join(directorio_ruta, old_file_name), os.path.join(directorio_ruta, new_file_name))
        print(f"el archivo {old_file_name} se renombro a {new_file_name}")
    elif len(mp4_files) == 0:
        print("no hay mp4s.")
    else:
        print("hay demasiados mp4s")



##Saca 1 screenshot por minuto y los deja en /capturas de forma enumerada 1.png, 2.png...n.png
def sacar_screenshots(video, tiempo, rutaimagen, clip):
    if not os.path.exists(rutaimagen):
        os.makedirs(rutaimagen)
    
    for i, t in enumerate(tiempo):
        rutaLoop = os.path.join(rutaimagen, '{}.png'.format(i + 1))
        clip.save_frame(rutaLoop, t)


def borrarVideo(video_file):
    attempts = 0
    max_attempts = 5  # max intentos
    wait_time = 1  # espera para borrar timeout

    while attempts < max_attempts:
        try:
            os.remove(video_file)
            break  # se borro bien
        except PermissionError:
            attempts += 1
            time.sleep(wait_time)
    else:
        print("Failed to delete file after multiple attempts.")

def extraerAudio(video, audio):
    video_clip = VideoFileClip(video)
    audio_clip = video_clip.audio
    audio_clip.write_audiofile(audio)
    video_clip.close()  


def transcribir():
    model = whisper.load_model("base")
    result = model.transcribe("./services/serviciosPython/output_audio.mp3")
    with open("./services/serviciosPython/transcripcion.txt", "w") as f:
        f.write(result["text"])

def eliminarMP3():
    os.remove("./services/serviciosPython/output_audio.mp3")



if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python script_name.py <url>")
        sys.exit(1)

    url = sys.argv[1]
    rutaDestino = "./services/serviciosPython/"

    print('SOY EL SCRIPT PYTHON Y ARRANQUE')

    descargaVideoYT(url, rutaDestino)

    print('PASE EL DESCARGA VIDEO')

    ##directorio donde buscará mp4s
    directorio_ruta = "./services/serviciosPython/"

    cambiarNombre(directorio_ruta)

    print('PASE EL cambia nombre')

    video = './services/serviciosPython/videoTest.mp4'
    rutaimagen = './services/serviciosPython/capturas'

    clip = VideoFileClip(video)
    total_minutes = int(clip.duration / 60) ##una por minuto
    tiempo = [i * 60 for i in range(total_minutes + 1)]## una captura por minuto

    sacar_screenshots(video, tiempo, rutaimagen, clip)


    print('saque screenshots')
    clip.close() 

    inputVideo = './services/serviciosPython/videoTest.mp4'
    output_audio_dir = './services/serviciosPython/'
    output_audio = os.path.join(output_audio_dir, 'output_audio.mp3') 

    extraerAudio(inputVideo, output_audio)
    

    borrarVideo(video)

    transcribir()

    eliminarMP3()
    
    