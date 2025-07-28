import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import toast from 'react-hot-toast'
import NoteDetails from './NoteDetails';
import { Link } from 'react-router-dom';
const HomePage = () => {
    const [loading,setLoading] = useState(true);
    const [notes,setNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            setLoading(true);
            try{
                const res = await fetch("http://localhost:5001/api/notes");
                const data = await res.json();
                setNotes(data);
            }catch(err){
                console.log("Error on fetching data: ",err);
                toast.error("Unable to load data from server")
            }finally{
                setLoading(false);
            }
        }
        fetchNotes();
        
    },[])
  return (
    <>
        <div className='container mx-auto px-4'>
            <div>HomePage</div>
            {loading && <h2>Notes is loading...</h2>}
            {notes.length > 0 &&
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {notes.map(note => (
                        <Link to={`/note/${note._id}`} key={note._id} >
                            <NoteDetails note={note} />
                        </Link>
                        
                    ))}
                </div>
            }
        </div>
    </>

  )
}

export default HomePage