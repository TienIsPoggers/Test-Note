import React from 'react'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
const NoteDetails = ({note}) => {
  return (
    <div className='flex flex-col bg-gray-200 p-4 rounded-lg'>
      <div className='text-xl text-red-400'>{note.title}</div>
      <div className='text-md'>{note.content}</div>
      <div className='ml-auto flex mt-4 gap-1'>
        <CiEdit className='cursor-pointer' size={25}/>
        <MdDelete className='cursor-pointer'  size={25} color='red'/>
      </div>
    </div>
  )
}

export default NoteDetails