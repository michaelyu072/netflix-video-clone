import React from 'react';
import {useState} from 'react';
import ProgressControls from './ProgressControls';
import Forward10Icon from '@material-ui/icons/Forward10';
import Replay10Icon from '@material-ui/icons/Replay10';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SubtitlesIcon from '@material-ui/icons/Subtitles';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Episodes from '@material-ui/icons/AmpStories';
import SpeedIcon from '@material-ui/icons/Speed';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import VolumeControls from './VolumeControls';


function Controls(props) {

  const[speedMenu, setSpeedMenu] = useState(false);
  const[volumeMenu, setVolumeMenu] = useState(false);
  

  const currentSpeedStyle = {background:"gray",
    color: "white",
    opacity: ".7"};

  function showSpeedMenu() {
    setSpeedMenu(true);
  
  }

  function hideSpeedMenu() {
    setSpeedMenu(false);
  }

  function showVolumeMenu() {
    setVolumeMenu(true);
  }

  function hideVolumeMenu() {
    setVolumeMenu(false);
  }


  function findVolumeButton() {
    if(props.volumePercentage<= .1) {
      return <VolumeMuteIcon className = "icon"/>;
    } else if (props.volumePercentage > .1 && props.volumePercentage <= .5) {
      return <VolumeDownIcon className = "icon"/>;
    } else {
      return <VolumeUpIcon className = "icon" />;
    }
  }

  const volumeIcon = findVolumeButton();

  return <div className = 'controls-container'>

  <ProgressControls goToTime = {props.goToTime}
                    timeLeft = {props.timeLeft} 
                    percentageWatched = {props.percentageWatched}/>


  <div className = "controls">

  <button onClick = {props.handlePlay}>
  {props.playButton ? <PlayArrowIcon className = "icon"/> 
  : <PauseIcon className = "icon" />}
  </button>


  <button onClick = {props.back10}><Replay10Icon className = "icon"/></button>


  <button onClick = {props.forward10}><Forward10Icon className = "icon"/></button>


<div className = "volume-controls-wrapper">
{ volumeMenu &&
  <VolumeControls 
  goToVolume = {props.goToVolume}
  volumePercentage = {props.volumePercentage}
   hideVolume = {hideVolumeMenu} 
   showVolume = {showVolumeMenu}/>}

  <button onMouseEnter = {showVolumeMenu} onMouseLeave = {hideVolumeMenu} onClick = {props.mute}>
  {props.muteButton ? <VolumeOffIcon className = "icon"/> : volumeIcon }
  </button>
  </div>


  <p className = "name">
    <span className = "title">Test Video</span>
    <span className = "episode"> Big Buck Bunny</span>
  </p>

  <button><HelpOutlineIcon className = "icon"/></button>
  <button><SkipNextIcon className = "icon" /></button>
  <button><Episodes className = "icon"/></button>
  <button><SubtitlesIcon className = "icon"/></button>





<div className = "speed-menu"> {speedMenu && <div className = "speed-container" onMouseEnter = {showSpeedMenu} onMouseLeave = {hideSpeedMenu}>
<ul >
  <li  style = {props.videoSpeed === 0.5 ? currentSpeedStyle : {}} onClick = {() => {
    props.changeSpeed(0.5);
  }}>0.5x</li> 
  <li style = {props.videoSpeed === 0.75 ? currentSpeedStyle : {}} onClick = {() => {
    props.changeSpeed(0.75);
  }}>0.75x</li>
  <li style = {props.videoSpeed === 1 ? currentSpeedStyle : {}} onClick = {() => {
    props.changeSpeed(1);
  }}>1x</li>
  <li style = {props.videoSpeed === 1.25 ? currentSpeedStyle : {}} onClick = {() => {
    props.changeSpeed(1.25);
  }}>1.25x</li>
  <li style = {props.videoSpeed === 1.5 ? currentSpeedStyle : {}} onClick = {() => {
    props.changeSpeed(1.5);
  }}>1.5x</li>
  <li style = {props.videoSpeed === 2 ? currentSpeedStyle : {}} onClick = {() => {
    props.changeSpeed(2);
  }}>2x</li> 
</ul></div>}
  <button onMouseEnter = {showSpeedMenu} onMouseLeave = {hideSpeedMenu}> 
  <SpeedIcon className = "icon"/>
  </button>
</div>



  <button onClick = {props.fullscreen}>
  {props.fullscreenIcon ? <FullscreenIcon className = "icon"/> : <FullscreenExitIcon className = "icon"/>} 
  
  </button>


  </div>
  </div>;
}


export default Controls;