from pytube import YouTube

video_url = 'https://www.youtube.com/watch?v=i7HRMEO6a-o'

yt = YouTube(video_url)

stream = yt.streams.get_highest_resolution()

stream.download()

# Grabs all available resolutions for the video
# resolution = yt.streams.filter(adaptive=True)