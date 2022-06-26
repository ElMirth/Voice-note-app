import Modal from "./Modal"

function AddNote({onClose, open, addNote, setTitle, setBody, title, body}) {

  return (
    <Modal modalLable='Add note' onClose={onClose} open={open}>
      <form className='addNote' name='addNote' onSubmit={(e) => addNote(e, title, body)}>
        <input 
          type='text'
          name='title' 
          onChange={(e) => setTitle(e.target.value.toUpperCase())} 
          value={title}
          placeholder='Enter title'/>
        <textarea 
          onChange={(e) => setBody(e.target.value)}
          placeholder='Write note'
          value={body}></textarea>
        <button type='submit'>Save</button>
      </form> 
    </Modal>
  )
}

export default AddNote
