import Navbar from '../../component/Navbar'
import Hero from './Hero'
import Section from './Section'
import Feature from './FeatureProduct'
import Cart from '../../component/Cart'

import { CartContext } from '@/component/CartContext'
import { useContext } from 'react'

function Home() {
    const {cartOpen} = useContext(CartContext)



    return (
        <div className='flex flex-col justify-start items-start w-full h-full' >
            {cartOpen && <Cart />}
            <Navbar />
            <Hero />
            <Section />
            <Feature />
        </div>
    )
}

export default Home