from pytube import YouTube
##ruta destino hardcodeada


##bajo video de youtube
def descargaVideoYT(url, rutaDestino):
    global tituloVideo
    video = YouTube(url)
    tituloVideo = video.title
    ##print(video.streams.filter(file_extension="mp4"))
    stream = video.streams.get_by_itag(22)
    stream.download(rutaDestino)
    
urlVideo = "https://www.youtube.com/watch?v=FLXmyau8Tmc"
rutaDestino="."
tituloVideo=""

descargaVideoYT(urlVideo,rutaDestino)


##capturas
from moviepy.editor import VideoFileClip
import os

def sacar_screenshots(video, tiempo, rutaimagen):
    if not os.path.exists(rutaimagen):
        os.makedirs(rutaimagen)
    
    clip = VideoFileClip(video)
    for t in tiempo:
        rutaLoop = os.path.join(rutaimagen, '{}.png'.format(int(t * clip.fps)))
        clip.save_frame(rutaLoop, t)


video=tituloVideo+".mp4"
rutaimagen='./capturas'
clip= VideoFileClip(video)
####tiempo = [i/clip.fps for i in range(int(clip.fps * clip.duration))] SACA TODOS LOS FRAMES
total_seconds = int(clip.duration)
tiempo = [i for i in range(0, total_seconds + 1)] ##saca 1 screens por sec

sacar_screenshots(video, tiempo, rutaimagen)
