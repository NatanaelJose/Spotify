//<div><i class="bi bi-heart-fill"></i></div>
//<i class="bi bi-pause-circle-fill"></i>
const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const cover = document.getElementById('cover')
const song = document.getElementById('audio');
const play = document.getElementById('play');
const next = document.getElementById('skip');
const previous = document.getElementById('back');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');

const requiem = {
    songName: 'Requiem',
    artist: 'Mozart',
    file: 'Mozart-Requiem'

};
const Ballade1 = {
    songName: 'Ballade No. 1 in G minor, Op. 23',
    artist: 'Chopin',
    file: 'Ballade No. 1 in G minor, Op. 23'
};
const Ballade2 = {
    songName: 'Ballade No. 2 in F major, op. 38',
    artist:'Chopin',
    file: 'Ballade No. 2 in F major, op. 38'
}

let isShuffled = false;
let isPlaying = false;
const playlist = [requiem, Ballade1, Ballade2];
let index = 0;

function nextSong(){
    if(index === playlist.length - 1){
        index = 0;
    } else{
        index += 1;
    }
    initializeSong();
    playSong();
};

function previousSong(){
    if(index === 0){
        index = playlist.length - 1;
    } else{
        index -= 1;
    }
    initializeSong();
    playSong();
};

function playSong(){
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
};

function pauseSong(){
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    song.pause();
    isPlaying = false;
};

function initializeSong(){
    cover.src = `images/${playlist[index].file}.png`;
    song.src = `songs/${playlist[index].file}.mp3`;
    bandName.innerHTML = playlist[index].artist;
    songName.innerHTML = playlist[index].songName;
};

function playPauseDecider(){
    if(isPlaying === true){
        pauseSong();
    } else {
        playSong();
    } 

};

function updateProgressBar(){
    const barWidth = (song.currentTime/song.duration)*100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`)
    setTimeout(() => {
        if(song.currentTime == song.duration){
            nextSong();
        }
    }, 1500);
};

function jumpTo(event){
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/width)*song.duration;
    song.currentTime = jumpToTime;
}

initializeSong();
console.log(song.played)
play.addEventListener('click', playPauseDecider);
next.addEventListener('click', nextSong);
previous.addEventListener('click', previousSong);
song.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', jumpTo);