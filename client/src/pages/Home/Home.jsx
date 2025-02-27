import Navbar from '../../component/Navbar'
import Hero from './Hero'
import Section from './Section'
import Feature from './FeatureProduct'
import Cart from '../../component/Cart'
import { useState } from 'react'

function Home(){

    const [cartOpen, setCartOpen] = useState(false)



    return(
        <div className='flex flex-col justify-start items-start w-full h-full' >
            {cartOpen && <Cart setCartOpen={setCartOpen} />}
            <Navbar cartOpen={setCartOpen} />
            <Hero/>
            <Section/>
            <Feature/>
        </div>
    )
}

export default Home