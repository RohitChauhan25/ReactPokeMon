import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BookScreen from './Pages/BookScreen'
import Details from './Pages/Details'
import Home from './Pages/Home'

export default function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={< Home/>} />
          <Route path='details/:id' element={< Details/>} />
          <Route path='bookmark' element={ < BookScreen />}/>
          <Route path='*' element={<h1>Error 404 Page not found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
