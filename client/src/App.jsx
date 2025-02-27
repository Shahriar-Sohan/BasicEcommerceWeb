import { useState } from 'react'
import './App.css'
import { Routes ,Route  } from 'react-router-dom'
import Home from '@/pages/Home/Home'
import About from '@/pages/About/About'
import Products from '@/pages/Products/Products'

function App() {


  return (
    <>
        <Routes >
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/products' element={<Products />} />
        </Routes>
    </>
  )
}

export default App
