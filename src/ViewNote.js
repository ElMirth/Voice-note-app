import { useState } from "react"
import Modal from "./Modal"

function ViewNote({onClose, open, id, title, body, toggleEditNote, saveNote}) {

  const [newTitle, setNewTitle] = useState(title)
  const [newBody, setNewBody] = useState(body)

  const handleSave = (e) => {
    saveNote(newTitle, newBody, id)
    toggleEditNote(e)
    onClose(e)
  }

  return (
    <Modal modalLable='Task Item' onClose={onClose} open={open.view}>
      <div className='viewNote'>
        <input 
          type='text' 
          value={newTitle} 
          onChange={e => setNewTitle(e.target.value)}
          readOnly={open.edit ? false : true}/>

        <textarea 
          onChange={e => setNewBody(e.target.value)}
          readOnly={open.edit ? false : true}
          value={newBody}/>

        <div className='viewNote__editNDelete'>
          {!open.edit
            ? <span onClick={toggleEditNote}>Edit</span>
            : <span 
                onClick={handleSave}>
                Save
              </span>
          }
        </div>
      </div>
    </Modal>
  )
}

export default ViewNote
