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
const repeatButton = document.getElementById('repeat');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');
const likeButton = document.getElementById('like');
const usrButton = document.getElementById('user-enter');

const requiem = {
    songName: 'Requiem',
    artist: 'Mozart',
    file: 'Mozart-Requiem',
    liked: false,

};
const Ballade1 = {
    songName: 'Ballade No. 1 in G minor, Op. 23',
    artist: 'Chopin',
    file: 'Ballade No. 1 in G minor, Op. 23',
    liked: false,
};
const Ballade2 = {
    songName: 'Ballade No. 2 in F major, op. 38',
    artist:'Chopin',
    file: 'Ballade No. 2 in F major, op. 38',
    liked: false,
};

const Ballade3 = {
    songName: 'Ballade No. 3 in A-flat major, Op. 47',
    artist: 'Chopin',
    file: 'Ballade No. 3 in A-flat major, Op. 47',
    liked: false,
};

const Allegro = {
    songName: 'Allegro in D Major, K. 626b/16',
    artist: 'Mozart',
    file: 'Mozart-Allegre',
    liked: false,
};

const Nocturne = {
    songName: 'Chopin - Nocturne op.9 No.2',
    artist: 'Chopin',
    file: 'Chopin - Nocturne op.9 No.2',
    liked: false,
}

let isShuffled = false;
let isPlaying = false;
let repeatOn = false;
let usrOn = false;
const OriginalPlaylist = JSON.parse(localStorage.getItem('playlist')) ?? [requiem, Ballade1, Ballade2, Ballade3, Nocturne, Allegro];
let sortedPlaylist = [...OriginalPlaylist]; //spread
let index = 0;

function nextSong(){
    if(index === sortedPlaylist.length - 1){
        index = 0;
    } else{
        index += 1;
    }
    initializeSong();
    playSong();
};

function previousSong(){
    if(index === 0){
        index = sortedPlaylist.length - 1;
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

function likeButtonRender(){
    // Código de antes
    // if(sortedPlaylist[index].liked == true){
    //     likeButton.querySelector('.bi').classList.remove('bi-heart');
    //     likeButton.querySelector('.bi').classList.add('bi-heart-fill');
    //     likeButton.classList.add('button-active')
    // } else {
    //     likeButton.querySelector('.bi').classList.add('bi-heart');
    //     likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
    //     likeButton.classList.remove('button-active')
    // }
    if(sortedPlaylist[index].liked == true){
        likeButton.classList.add('button-active')
    } else {
        likeButton.classList.remove('button-active')
    }

};

function initializeSong(){
    cover.src = `./images/${sortedPlaylist[index].file}.png`;
    song.src = `./songs/${sortedPlaylist[index].file}.mp3`;
    bandName.innerHTML = sortedPlaylist[index].artist;
    songName.innerHTML = sortedPlaylist[index].songName;
    likeButtonRender();
};

function playPauseDecider(){
    if(isPlaying === true){
        pauseSong();
    } else {
        playSong();
    } 

};

function updateProgress(){
    let currentTimer = Math.floor(song.currentTime);
    let songTimer = Math.floor(song.duration);
    const barWidth = (currentTimer/songTimer)*100;
    songTime.innerHTML = toHHMMSS(song.currentTime);
    currentProgress.style.setProperty('--progress', `${barWidth}%`)

};

function jumpTo(event){
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/width)*song.duration;
    song.currentTime = jumpToTime;
    if(isPlaying == true){
        pauseSong();
        currentProgress.style.setProperty('--transition', '0.3s');
    setTimeout(() => {
        playSong();
    }, 1000)
    }
};

function shuffleArray(preShuffleArray){
    let size = preShuffleArray.length;
    let currentIndex = size - 1;
    for (let c = currentIndex; c > 0; c--){
        let randomIndex = Math.floor(Math.random()*size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] = aux;
    }
};

function shuffleButtonClicked(){
    if(isShuffled == false){
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add('button-active');
    } else {
        isShuffled = false;
        sortedPlaylist = [...OriginalPlaylist];
        shuffleButton.classList.remove('button-active');
    }
};
function repeatButtonClicked(){
    if(repeatOn == false){
        repeatOn = true;
        repeatButton.classList.add('button-active');
        repeatButton.classList.remove('unrotate');
        repeatButton.classList.add('rotate');

    } else {
        repeatOn = false;
        repeatButton.classList.remove('button-active');
        repeatButton.classList.add('unrotate');
        repeatButton.classList.remove('rotate');
    }
};

function nextOrRepeat(){
    if(repeatOn == false){
        setTimeout(() => {
            nextSong();
        }, 1000);
    } else {
        setTimeout(() => {
            playSong();
        }, 500);
    }
};

function toHHMMSS( originalNumber){
    let hours = Math.floor(originalNumber/3600);
    let min = Math.floor((originalNumber-hours*3600)/60);
    let sec = Math.floor(originalNumber - hours*3600 - min*60);
    return `${hours.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
};

function updateTotalTime(){
    totalTime.innerHTML = toHHMMSS(song.duration);
    
};

function likeButtonClicked(){
    if(sortedPlaylist[index].liked == false){
        sortedPlaylist[index].liked = true;
    } else {
        sortedPlaylist[index].liked = false;
    }
    likeButtonRender();
    localStorage.setItem('playlist',
    JSON.stringify(OriginalPlaylist),
    );
}

function usrButtonClicked() {
    if(usrOn == false){
        usrButton.classList.add("button-active");
        usrOn = true;
    } else {
        usrButton.classList.remove("button-active");
        usrOn = false;
    }
}

initializeSong();
play.addEventListener('click', playPauseDecider);
next.addEventListener('click', nextSong);
likeButton.addEventListener('click', likeButtonClicked);
usrButton.addEventListener('click', usrButtonClicked);
shuffleButton.addEventListener('click', shuffleButtonClicked);
previous.addEventListener('click', previousSong);
repeatButton.addEventListener('click', repeatButtonClicked);
song.addEventListener('loadedmetadata', updateTotalTime);
song.addEventListener('timeupdate', updateProgress);
song.addEventListener('ended', nextOrRepeat);
progressContainer.addEventListener('click', jumpTo);