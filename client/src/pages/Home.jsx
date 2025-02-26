import Navbar from '../component/Navbar'
import Hero from '@/component/Hero'

function Home(){
    return(
        <div className='flex flex-col justify-start items-start w-full h-full' >
            <Navbar/>
            <Hero />
        </div>
    )
}

export default Home