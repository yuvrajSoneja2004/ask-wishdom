import React, { useEffect, useRef } from 'react'
import TestAudio from '../assets/test-audio.mp3';


function Audio({path}) {
    const audioRef = useRef(null);

    useEffect(() => {
      audioRef.current.play();
      audioRef.current.muted = false;
    }, []);
  
    return (
      <audio ref={audioRef} loop={true}>
        <source src={path} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    );
}

export default Audio