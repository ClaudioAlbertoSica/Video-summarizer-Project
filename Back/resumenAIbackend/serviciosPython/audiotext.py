import whisper

model = whisper.load_model("base")
result = model.transcribe("audio1.mp3") ##nombre archivo

with open("transcript.txt", "w") as f:
    f.write(result["text"])