function Speak({children, open, toogleViewOptions, listening=false, stopListening}) {

  return (
    <div className={`speak ${open ? 'speak__OptionsView' : '' }`}>
      {open &&
        <div className='options'>
          {children}
        </div>
      }
      <img 
        src='/speak.png' 
        alt='microphone' 
        onClick={listening ? stopListening : toogleViewOptions}
        style= {{backgroundColor: listening ? '#468ad3e8' : 'gray'}}
      />
    </div>
  )
}

export default Speak
