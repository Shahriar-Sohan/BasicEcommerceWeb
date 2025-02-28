import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home/Home'
import About from '@/pages/About/About'
import Products from '@/pages/Products/Products'
import { CartProvider } from './component/CartContext'

function App() {


  return (
    <>
      <CartProvider>
        <Routes >
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/products' element={<Products />} />
        </Routes>
      </CartProvider>
    </>
  )
}

export default App
