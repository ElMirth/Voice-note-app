import {useState} from 'react'
import ViewNote from './ViewNote'

function Note({date, title, body, deleteNote, id, saveNote}) {

  const [open, setOpen] = useState({view: false, edit: false})

  const handleClose = (e) => {
    e.stopPropagation()
    setOpen({edit:false, view: false})
  }

  const toggleEditNote = (e) => {
    e.stopPropagation()
    setOpen({...open, edit: !open.edit})
  }

  return (
    <div className='note' onClick={() => setOpen({...open, view: true})}>
      <span className='note__date'>{date}</span>
      <div className='note__body'>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>

      <button 
        className='note__deleteButton' 
        onClick={(e) => deleteNote(e, id)}>
          Delete
      </button>
      
      <ViewNote 
        onClose={handleClose}
        date={date}
        title={title}
        id={id}
        body={body}
        open={open}
        toggleEditNote={toggleEditNote}
        saveNote={saveNote} />
    </div>
  )
}

export default Note