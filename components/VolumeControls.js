import React from 'react';


function VolumeControls(props) {

    return <div  onMouseEnter = {props.showVolume} onMouseLeave = {props.hideVolume} className = 'volume-controls'>
            
    <div  onClick = {props.goToVolume} className = 'volume-bar'>

    <div className = 'volume-head'></div>

        <div style = {{height: (props.volumePercentage * 100)+"%"}} className = 'current-volume-bar'></div>

        

    </div>
    

</div>;
}

export default VolumeControls;