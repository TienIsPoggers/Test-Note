import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'
const NoteDetailsPage = () => {
  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');
  const [loading,setLoading] = useState(false);
  const [loadingDelete,setLoadingDelete] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchNoteById = async () => {
      setLoading(true)
      try{
        const res = await fetch(`http://localhost:5001/api/notes/${id}`)
        const data = await res.json();
        setTitle(data.title);
        setContent(data.content);
      }catch(err){
        toast.error("Failed to load note from server");
      }finally{
        setLoading(false);
      }
    }
    fetchNoteById();
  },[id])
  const handleChangeNote = async (e) => {
    e.preventDefault();
    if(!title.trim() || !content.trim()){
      toast.error("Please fill all field");
      return;
    }
    setLoading(true);
    try{  
      await fetch(`http://localhost:5001/api/notes/${id}`,{
        method:"PUT",
        headers:{
          'Content-Type':"application/json",
        },
        body:JSON.stringify({title:title,content:content})
      })
      toast.success("Succuess to update Note for server");
    }catch(err){
      toast.error("Failed to update data from server: ",err)
    }finally{
      setLoading(false);
    }
  }
  const handleDeleteNote = async () => {

    setLoadingDelete(true);
    try{
      await fetch(`http://localhost:5001/api/notes/${id}`,{
        method:"DELETE"
      })
      toast.success("Succuess to delete Note for server");
      navigate('/');
    }catch(error){
      toast.error("Failed to delete note form server ",err)
      setLoadingDelete(false);
    }
  }
  return (
    <div className='container mx-auto px-4'>
      <form onSubmit={handleChangeNote} className='bg-gray-200 p-4 max-w-[600px] mx-auto'>
        <div className='flex flex-col justify-between min-h-[400px]'>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col justify-center gap-2'>
              <label htmlFor="title" className='font-bold text-md'>Title: </label>
              <input type='text' placeholder='Note Title' className='border p-1 pl-3 border-2 rounded bg-white' id='title' value={title} onChange={(e) => setTitle(e.target.value)}></input>
            </div>
            <div className='flex flex-col justify-center gap-2'>
              <label htmlFor="content" className='font-bold text-md'>Content: </label>
              <textarea type='text' placeholder='Note Content' className='border p-1 pl-3 border-2 rounded bg-white min-h-[200px]' id='content' value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            </div>
          </div>
          <div className='ml-auto'>
            <button type='sumbit' className='bg-white border-2 py-1 px-3 cursor-pointer font-bold rounded-lg' disabled={loading}>{loading ? "Saving..." : "Save"}</button>
          </div>
        </div>
      </form>
      <div className="mx-auto w-fit mt-4 cursor-pointer">
        {!loadingDelete && <button onClick={() => handleDeleteNote()} className="py-2 px-4 rounded-lg font-bold text-white bg-red-400 cursor-pointer" disabled={loadingDelete}>Delete Note</button>}
        
      </div>
    </div>
  )
}

export default NoteDetailsPage