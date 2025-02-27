import Navbar from '../../component/Navbar'
import Hero from './Hero'
import Section from './Section'
import Feature from './FeatureProduct'

function Home(){
    return(
        <div className='flex flex-col justify-start items-start w-full h-full' >
            <Navbar/>
            <Hero/>
            <Section/>
            <Feature/>
        </div>
    )
}

export default Home