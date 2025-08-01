console.log('Welcome to Spotify');

// initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
  { songName: 'Subhanallah', filePath: 'songs/1.mp3', coverPath: 'covers/1.jpg' },
  { songName: 'Khuda Jaane', filePath: 'songs/2.mp3', coverPath: 'covers/2.jpg' },
  { songName: 'Teri Ore', filePath: 'songs/3.mp3', coverPath: 'covers/3.jpg' },
  { songName: 'Tum Se Hi', filePath: 'songs/4.mp3', coverPath: 'covers/4.jpg' },
  { songName: 'Ajab Si', filePath: 'songs/5.mp3', coverPath: 'covers/5.jpg' },
  { songName: 'Agar Tum Sath Ho', filePath: 'songs/6.mp3', coverPath: 'covers/6.jpg' },
  { songName: 'Channa Mereya', filePath: 'songs/7.mp3', coverPath: 'covers/7.jpg' },
  { songName: 'Ishq Di Baajiyaan', filePath: 'songs/8.mp3', coverPath: 'covers/8.jpg' },
  { songName: 'Guzarish', filePath: 'songs/9.mp3', coverPath: 'covers/9.jpg' },
  { songName: 'Mitwa', filePath: 'songs/10.mp3', coverPath: 'covers/10.jpg' }
];

songItems.forEach((element, i) => {
  //document.getElementsByTagName('img')[0].src = songs[i].coverPath;
  //document.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});

// handle play/pause click
masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
    const currentSongPlayButton = document.getElementById(songIndex);
    if (currentSongPlayButton) {
      currentSongPlayButton.classList.remove('fa-circle-play');
      currentSongPlayButton.classList.add('fa-circle-pause');
    }
  } else {
    audioElement.pause();
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
    gif.style.opacity = 0;
    const currentSongPlayButton = document.getElementById(songIndex);
    if (currentSongPlayButton) {
      currentSongPlayButton.classList.remove('fa-circle-pause');
      currentSongPlayButton.classList.add('fa-circle-play');
    }
  }
});

// listen to events
audioElement.addEventListener('timeupdate', () => {
  //update seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
  audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.classList.remove('fa-circle-pause');
    element.classList.add('fa-circle-play');
  });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
  element.addEventListener('click', (e) => {
    makeAllPlays();
    songIndex = parseInt(e.target.id);
    e.target.classList.remove('fa-circle-play');
    e.target.classList.add('fa-circle-pause');
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex - 1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
  });
});

document.getElementById('next').addEventListener('click', () => {
  if (songIndex >= 10) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex}.mp3`;
  masterSongName.innerText = songs[songIndex - 1].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-circle-play');
  masterPlay.classList.add('fa-circle-pause');
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.classList.remove('fa-circle-pause');
    element.classList.add('fa-circle-play');
  });
});

document.getElementById('previous').addEventListener('click', () => {
  if (songIndex <= 0) {
    songIndex = 10;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex}.mp3`;
  masterSongName.innerText = songs[songIndex - 1].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-circle-play');
  masterPlay.classList.add('fa-circle-pause');
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.classList.remove('fa-circle-pause');
    element.classList.add('fa-circle-play');
  });
});
