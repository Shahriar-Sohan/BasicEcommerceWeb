import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import About from '@/pages/About/About';
import Products from '@/pages/Products/Products';
import { CartProvider } from './component/CartContext';
import { ProductsProvider } from './component/ProductContext';
import { useEffect } from 'react';

function App() {
  const ScrollRefresh = () => {
    useEffect(() => {
      let startY = 0;

      const handleTouchStart = (e) => {
        startY = e.touches[0].clientY;
      };

      const handleTouchMove = (e) => {
        const currentY = e.touches[0].clientY;
        if (currentY - startY > 50 && window.scrollY === 0) {  // Detect pull down
          window.location.reload();
        }
      };

      window.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchmove', handleTouchMove);

      return () => {
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
      };
    }, []);

    return null;  
  };

  return (
    <>
      <ScrollRefresh />  
      <ProductsProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </CartProvider>
      </ProductsProvider>
    </>
  );
}

export default App;