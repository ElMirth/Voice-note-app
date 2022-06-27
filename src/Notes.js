import Note from './Note'
import AddNote from './AddNote'
import {useEffect, useState} from 'react'
import Speak from './Speak'
import SpeakOption from './SpeakOption'
import { useSpeechRecognition } from 'react-speech-kit';

function Notes() {

  const [openAddModal, setOpenAddModal] = useState(false)
  const [notes, setNotes] = useState([])
  const [filteredNotes, setFilteredNotes] = useState([])
  const [lastId, setLastId] = useState(0)
  const [speakOptionOpen, setSpeakOptionOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [current, setCurrent] = useState('')

  const getStateSetter = (result) => {
    switch(current) {
      case 'search':
        setSearchValue(result)
        break;
      case 'title':
        setTitle(result.toUpperCase())
        break;
      case 'body':
        setBody((prev) => prev + ' ' + result)
        break;
      default:
      return null
    }
  }

  const { listen, listening, stop, supported } = useSpeechRecognition({
    onResult: (result) => {
      getStateSetter(result)
    }
  })

  useEffect(() => {
    if(current !== ''){
      if(!supported) alert('Speech recognition is not supported')
      if(current === 'body'){
        listen({interimResults: false})
      }else{
        listen()
      }
    }
  }, [current, listen, supported])

  const addNote = (e, title, body) => {
    e.preventDefault()
    const date = new Date()
    const dateArr = date.toLocaleString().split(',')
    const formatedDate  = dateArr[0]
    const id = lastId + 1
    setNotes([{date: formatedDate, title, body, id}, ...notes])
    setLastId(id)
    setOpenAddModal(false)
    setBody('')
    setTitle('')
  }

  const saveNote = (title, body, id) => {
    const index = notes.findIndex(note => {
      return note.id === id;
    })  
    if (index !== -1) {
      notes[index].title = title.toUpperCase()
      notes[index].body = body
    }
    setNotes([...notes])
  }

  const deleteNote = (e, id) => {
    e.stopPropagation()
    const filteredNote = notes.filter((note) => (
      id !== note.id
    ))
    setNotes(filteredNote)
  }

  useEffect(() => {
    if(searchValue !== '') {
      const filtered = notes.filter((note) => {
        const noteTitle = note.title.toLowerCase().trim()
        return noteTitle.includes(searchValue.toLowerCase().trim())
      })
      setFilteredNotes(filtered)
    }
  }, [notes, searchValue])

  return (
    <div className='notes'>
      <div className='notes__container'>
        <div className='notes__head'>
          <button
            onClick={() => setOpenAddModal(true)}>
            <i>+</i> Add new note
          </button>

          <div className='notes__searchForm'>
            <input 
              value={searchValue} 
              placeholder='Search notes'
              onChange={e => setSearchValue(e.target.value)}/>

            <img src='/search-i.png' alt='search'/>
          </div>
        </div>

        <div className='notes__note'>
          {!searchValue.length
           ? notes.map((note, key) => (
              <Note key={key}
                date={note.date}
                title={note.title}
                id={note.id}
                body={note.body}
                deleteNote={deleteNote}
                saveNote={saveNote}
              />
              ))

            : filteredNotes.map((note, key) => (
              <Note key={key}
                date={note.date}
                title={note.title}
                id={note.id}
                body={note.body}
                deleteNote={deleteNote}
                saveNote={saveNote}
              />
              ))
          }
        </div>
      </div>

      {openAddModal &&
        <AddNote
          open={openAddModal}
          addNote={addNote}
          onClose={() => setOpenAddModal(false)}
          setTitle={setTitle}
          setBody={setBody}
          title={title}
          body={body}
        />
      }
      
      <Speak
        open={speakOptionOpen} 
        toogleViewOptions={() => setSpeakOptionOpen(!speakOptionOpen)}
        listening={listening}
        stopListening={() => {setCurrent(''); stop()}}
      >
      {!openAddModal
        ?  <SpeakOption 
            icon={<img src='/search-i.png' alt='search'/>}
            text='Search'
            onClick={() => {setCurrent('search'); setSpeakOptionOpen(!speakOptionOpen)}}
          />
        : <>
            <SpeakOption
              icon='+'
              text='Title'
              onClick={() => {setCurrent('title'); setSpeakOptionOpen(!speakOptionOpen)}}
            />
            <SpeakOption 
              icon='+'
              text='Body'
              onClick={() => {setCurrent('body'); setSpeakOptionOpen(!speakOptionOpen)}}
            />
          </>
        }
      </Speak>
    </div>
  )
}

export default Notes
