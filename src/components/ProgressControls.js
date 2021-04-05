import React from 'react';

function ProgressControls(props) {


    return <div className = 'progress-controls'>
            
            <div onClick = {props.goToTime} className = 'progress-bar'>

                <div style ={{width : props.percentageWatched}} className = 'watched-bar'></div>

                <div onDrag = {props.goToTime} onClick = {(event) => {event.stopPropagation();}}  className = 'playhead'></div>

            </div>
            <div className = 'time-remaining'>{ 
                Math.floor(props.timeLeft/60) + ":" + (props.timeLeft%60>10 
                                                        ? Math.floor(props.timeLeft%60) : "0" + Math.floor(props.timeLeft%60) ) 
            }</div>
            

            
    </div>;
}

export default ProgressControls;