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
    if not os.path.isfile(tituloVideo):
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
        print(f"The file {old_file_name} has been renamed to {new_file_name}")
    elif len(mp4_files) == 0:
        print("There are no .mp4 files in the specified directory.")
    else:
        print("There are multiple .mp4 files in the specified directory. Cannot proceed.")




def sacar_screenshots(video, tiempo, rutaimagen, clip):
    if not os.path.exists(rutaimagen):
        os.makedirs(rutaimagen)
    
    for t in tiempo:
        rutaLoop = os.path.join(rutaimagen, '{}.png'.format(int(t * clip.fps)))
        clip.save_frame(rutaLoop, t)

def borrarVideo(video_file):
    attempts = 0
    max_attempts = 5  # Maximum number of attempts
    wait_time = 1  # Wait time in seconds between attempts

    while attempts < max_attempts:
        try:
            os.remove(video_file)
            break  # File successfully deleted, exit loop
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
    total_seconds = int(clip.duration)
    tiempo = [i for i in range(0, total_seconds + 1)]

    ##sacar_screenshots(video, tiempo, rutaimagen, clip)


    print('saque screenshots')
    clip.close() 

    inputVideo = './services/serviciosPython/videoTest.mp4'
    output_audio_dir = './services/serviciosPython/'
    output_audio = os.path.join(output_audio_dir, 'output_audio.mp3') 

    extraerAudio(inputVideo, output_audio)
    

    ##borrarVideo(video)

    transcribir()