import React from 'react'

function SpeakOption({icon, text, onClick}) {
  return (
    <div className='speakOption' onClick={onClick}>
      <span className='speakOption__icon'>{icon}</span>
      <span className='speakOption__text'>{text}</span>
    </div> 
  )
}

export default SpeakOption
