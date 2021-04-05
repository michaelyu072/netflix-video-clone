import React, {useRef} from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import Controls from './Controls';


function Video() {

  const thisVideo = useRef(null);
  const thisVideoContainer = useRef(null);
  const [isPlaying, togglePlay] = useState(false);
  const [isMuted, toggleMute] = useState(false);
  const [isFullscreen, toggleFullscreen] = useState(false);
  const [percentageWatched, setPercentageWatched ] = useState(0);
  const [listened, updateListened] = useState(false);
  const [timeLeft, updateTimeLeft] = useState(0);
  const [videoSpeed, updateSpeed] = useState(1);
  const [volumePercentage, updateVolume] = useState([.5,0]);


//////////play

  function handlePlay() {
    if(!isPlaying) {
      thisVideo.current.play();

      

    } else {
      thisVideo.current.pause();
    }
    togglePlay(!isPlaying);
  }


  function back10() {
    thisVideo.current.currentTime -= 10;
  }

  function forward10() {
    thisVideo.current.currentTime += 10;
  }

  function goToTime(event) {
    let target = event.target;
    const parent = target.offsetParent;
    const time = (event.pageX - (target.offsetLeft + parent.offsetLeft))/(target.offsetWidth);
    thisVideo.current.currentTime = time*thisVideo.current.duration;
  }

  //////////volume
  function mute() {

      if(!isMuted) {
        thisVideo.current.volume = volumePercentage[1];
      } else {
        thisVideo.current.volume = volumePercentage[0];
      }

      thisVideo.current.muted = !thisVideo.current.muted;
      toggleMute(!isMuted);
      console.log("clicked");
  }

  function changeVolume(value) {
    thisVideo.current.volume = value;
    updateVolume([value, volumePercentage[1]]);
    toggleMute(false);
  }

  function goToVolume(event) {
    let target = event.target;
    let values = target.getBoundingClientRect()
    const top = values.top;
    const bottom = values.bottom;
    const distance = event.pageY;
    const result = Math.abs((bottom-distance)/(bottom-top));
    changeVolume(Math.min(result, 1));
  }





  //////////screen

  function fullscreen() {

    if(!isFullscreen) {
      thisVideoContainer.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    toggleFullscreen(!isFullscreen);
  }

  document.addEventListener('fullscreenchange', () => {
    if(!document.fullscreenElement) {
      toggleFullscreen(false);
    } else {
      toggleFullscreen(true);
    }
  })

  function changeSpeed(value) {
    thisVideo.current.playbackRate = value;
    updateSpeed(value);
  }
  
//////////time
     
  useEffect(() => {
    if(!listened) {
    thisVideo.current.addEventListener('timeupdate', () => {
      setPercentageWatched(((thisVideo.current.currentTime / thisVideo.current.duration)*100)+"%");
      updateTimeLeft(thisVideo.current.duration - thisVideo.current.currentTime);
      updateListened(true);
    })
  }
});








//////////
  return <div ref = {thisVideoContainer} className = "video-container">
  <video ref = {thisVideo} src = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
    loop ></video>

  <Controls 
    handlePlay = {handlePlay} 
    playButton = {!isPlaying}
    back10 = {back10}
    forward10 = {forward10}
    mute = {mute}
    muteButton = {isMuted}
    fullscreen = {fullscreen}
    fullscreenIcon = {!isFullscreen}
    percentageWatched = {percentageWatched}
    timeLeft = {timeLeft}
    goToTime = {goToTime}
    changeSpeed = {changeSpeed}
    videoSpeed = {videoSpeed}
    volumePercentage = {isMuted ? volumePercentage[1] : volumePercentage[0]}
    goToVolume = {goToVolume}
  />
</div>;
}

export default Video;