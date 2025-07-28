import React from 'react'
import data from './Navbar.json'
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className='flex px-8 justify-between mt-4 mb-8'>
        <h1 className='text-3xl font-bold'>Note Details</h1>
        {data.length > 0 && 
            <ul className='flex gap-4'>
                {data.map(item => (
                    <li key={item.text } className='text-black hover:text-red-400 text-lg font-bold'><Link to={item.link}>{item.text}</Link></li>
                ))}
            </ul>
        }

    </nav>
  )
}

export default Navbar