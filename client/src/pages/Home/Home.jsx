import { CartContext } from '@/component/CartContext'
import { useContext } from 'react'
import { OverlayContext } from '@/component/OverlayContext'

import Navbar from '../../component/Navbar'
import Hero from './Hero'
import Section from './Section'
import Feature from './FeatureProduct'
import Cart from '../../component/Cart'
import ProductOverlay from '@/component/ProductOverlay'
import PromoBanner from './PromoBanner'
import NewArrivals from './NewArrivals'
import DiscountSection from './DiscountSelection'
import Testimonials from './Testimonials'
import Newsletter from './Newsletter'
import Footer from '@/component/Footer'


function Home() {
    const {cartOpen} = useContext(CartContext)
    const { isOverlayVisible } = useContext(OverlayContext)


    return (
        <div className='flex flex-col justify-start items-center w-full h-full overflow-x-hidden' >
            {isOverlayVisible && <ProductOverlay />}
            {cartOpen && <Cart />}
            <Navbar />
            <Hero />
            <PromoBanner/>
            <Section />
            <NewArrivals/>
            <DiscountSection/>
            <Feature />
            <Testimonials/>
            <Newsletter/>
            <Footer/>
        </div>
    )
}

export default Home