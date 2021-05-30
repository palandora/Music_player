const previousBtn = document.querySelector("#previous")
const playBtn = document.querySelector("#play")
const nextBtn = document.querySelector("#next")
const audio = document.querySelector("audio")
const progressContainer = document.querySelector(".progressind")
const progress = document.querySelector(".progress")
const currentTitle = document.querySelector("#current_title")
const currentArtist = document.querySelector("#current_artist")
const currentCover = document.querySelector("#current_cover");

let trackIndex = 0;

const tracks = ["Guarda come dondolo","Happy ending","Nel blu dipinto di blu",
    "Piu di te","Un bacio a mezzanotte"]
const artists = ["Eduardo Vianello", "Alex Cameron", "Marino Marini",
"Mina", "Quartetto Cetra"]

loadAudio(0)

function loadAudio(trackIndex){
    audio.src = `tracks/${tracks[trackIndex]}.mp3`
    currentCover.src = `covers/${tracks[trackIndex]}.jpg`
    currentTitle.innerText = tracks[trackIndex]
    currentArtist.innerText = artists[trackIndex]
}


function playSong(){
    playBtn.innerText = "pause";
    audio.play();
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

nextBtn.addEventListener("click",nextSong)
previousBtn.addEventListener("click",prevSong)

