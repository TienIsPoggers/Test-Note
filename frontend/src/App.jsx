import { useState } from 'react'
import './app.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NoteDetailsPage from './pages/NoteDetailsPage'
import CreatePage from './pages/CreatePage'
import Navbar from './layout/navbar'
function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create' element={<CreatePage />} />
        <Route path='/note/:id' element={<NoteDetailsPage />} />
      </Routes>
    </>
  )
}

export default App
