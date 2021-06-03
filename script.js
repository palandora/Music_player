const previousBtn = document.querySelector("#previous")
const playBtn = document.querySelector("#play")
const nextBtn = document.querySelector("#next")
const shuffleBtn = document.querySelector("#shuffle")
const audio = document.querySelector("audio")
const progressContainer = document.querySelector(".progressind")
const progress = document.querySelector(".progress")
const labelCurrentTime = document.querySelector("#currentTime")
const labelRemainingTime = document.querySelector("#remainingTime")
const currentTitle = document.querySelector("#current_title")
const currentArtist = document.querySelector("#current_artist")
const currentCover = document.querySelector("#current_cover");
const trackList = document.querySelectorAll(".track")


let trackIndex = 0;

const tracks = ["Guarda come dondolo","Happy ending","Nel blu dipinto di blu",
    "Piu di te","Un bacio a mezzanotte"]
const artists = ["Eduardo Vianello", "Alex Cameron", "Marino Marini",
"Mina", "Quartetto Cetra"]

loadAudio(trackIndex)




function highlightCurrentTrack(){
    //highlight cell
    trackList.forEach(function(track) {
        if(track.classList.contains("selected")) track.classList.remove("selected") 
    });
    trackList[trackIndex].classList.add("selected")

}



function loadAudio(trackIndex){
    audio.src = `tracks/${tracks[trackIndex]}.mp3`
    currentCover.src = `covers/${tracks[trackIndex]}.jpg`
    currentTitle.innerText = tracks[trackIndex]
    currentArtist.innerText = artists[trackIndex]
}



function playSong(){
    playBtn.innerText = "pause";
    highlightCurrentTrack()
    audio.play();
}

function formatTime(time){
    let seconds = parseInt(time % 60);
    let minutes = parseInt((time / 60) % 60);
    if(seconds < 10) seconds = `0${seconds}`
    if(minutes < 10) minutes = `0${minutes}`
    return minutes + ':' + seconds ;
}

function updateProgress(e){
    //set progressBar
    let currentTime = e.srcElement.currentTime
    let duration = e.srcElement.duration
    let remainingTime = duration - currentTime
    progress.style.width = `${(currentTime/duration)*100}%`
    //set label time played
    labelCurrentTime.innerText = formatTime(currentTime)
    //set label time remaining
    currentTime == 0 ? labelRemainingTime.innerText = "00:00" :
        labelRemainingTime.innerText = formatTime(remainingTime)
   
   
    //nextSong
    if(remainingTime==0) nextSong()



}

function pauseSong(){
    playBtn.innerText = "play_arrow";
    audio.pause();
}

function nextSong(){
    trackIndex++
    if(trackIndex>tracks.length-1){
        trackIndex = 0;
    }
    loadAudio(trackIndex)
    playSong()
}

function prevSong(){
    trackIndex--
    if(trackIndex<0){
        trackIndex = tracks.length-1;
    }
    loadAudio(trackIndex)
    playSong()
}


function shuffle(){
    trackIndex = Math.floor(Math.random() * tracks.length)
    loadAudio(trackIndex)
    playSong()
}

function setProgress(e){
    const widthObj = e.target.clientWidth
    const relativePos = e.offsetX
    const duration = audio.duration

    audio.currentTime = (relativePos/widthObj)*duration
}


playBtn.addEventListener("click", ()=>{
    switch(playBtn.innerText){
        case "play_arrow":
            playSong()
            break
        case "pause":
            pauseSong()
            break
    }
})

//Event Listener

audio.addEventListener("timeupdate",updateProgress)
nextBtn.addEventListener("click",nextSong)
previousBtn.addEventListener("click",prevSong)
shuffleBtn.addEventListener("click",shuffle)
progressContainer.addEventListener("mousedown", setProgress)

trackList.forEach((track,index)=>{
    track.addEventListener("click", ()=>{
        trackIndex = index
        loadAudio(trackIndex)
        playSong()
    })
})