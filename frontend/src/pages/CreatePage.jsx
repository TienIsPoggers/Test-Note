import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSumbitForm = async (e) => {
    e.preventDefault();
    if(!title.trim() || !content.trim()){
      toast.error("Please fill all field");
      return;
    }
    setLoading(true);
    try{  
      await fetch("http://localhost:5001/api/notes",{
        method:"POST",
        headers:{
          'Content-Type':"application/json",
        },
        body:JSON.stringify({title:title,content:content})
      })
      toast.success("Succuess to create new Note for server");
      navigate('/');
    }catch(err){
      toast.error("Failed to create data from server: ",err)
    }finally{
      setLoading(false);
    }
  }
  return (
    <div className='container mx-auto px-4'>
      <form onSubmit={handleSumbitForm} className='bg-gray-200 p-4 max-w-[600px] mx-auto'>
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
            <button type='sumbit' className='bg-white border-2 py-1 px-3 cursor-pointer font-bold rounded-lg' disabled={loading}>{loading ? "Creating..." : "Create"}</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreatePage