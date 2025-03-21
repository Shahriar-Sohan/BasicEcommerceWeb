import './App.css';
import Home from '@/pages/Home/Home';
import About from '@/pages/About/About';
import Products from '@/pages/Products/Products';
import Login from './component/SignIn';

import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './component/CartContext';
import { ProductsProvider } from './component/ProductContext';
import { OverlayProvider } from './component/OverlayContext';


function App() {


  return (
    <>
      <OverlayProvider>
        <ProductsProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path='/login' element={<Login/>} />
            </Routes>
          </CartProvider>
        </ProductsProvider>
      </OverlayProvider>
    </>
  );
}

export default App;