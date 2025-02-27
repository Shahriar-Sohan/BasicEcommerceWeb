import Navbar from '../../component/Navbar'
import Hero from './Hero'
import Section from './Section'
import Feature from './FeatureProduct'
import Cart from '@/component/Cart'

function Home(){
    return(
        <div className='flex flex-col justify-start items-start w-full h-full' >
            <Cart/>
            <Navbar/>
            <Hero/>
            <Section/>
            <Feature/>
        </div>
    )
}

export default Home