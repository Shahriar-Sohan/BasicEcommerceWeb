import { useState } from 'react'
import { Link } from 'react-router-dom'

import Cart from '../assets/Cart.Gif'
import StaticCart from '../assets/StaticCart.png'
import ProfilePic from '../assets/person.svg'


function Navbar() {
    const [isHovered, setIsHovered] = useState(false)



    return (
        <nav className='flex flex-row justify-between items-center w-full p-3 bg-white fixed' >
            <div className='flex flex-row gap-10' >
            <h2 className='text-black text-4xl' >RivalRay</h2>
                <input className='text-black bg-stone-200 px-5 rounded-4xl w-[25vw]' type='text' placeholder='Search...' />
            </div>
            <ul className='flex flex-row gap-5 mr-50'>
                <li><Link to='/' >Home</Link></li>
                <li><Link to='/products' >Products</Link></li>
                <li><Link to='/about' >About</Link></li>
            </ul>
            <div className='flex flex-row gap-2 mr-4'>
                <img className='size-8'
                    src={isHovered ? Cart : StaticCart} alt='Cart'
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                />
                <img className='size-8'
                    src={ProfilePic} alt='ProfilePic' />
            </div>


        </nav>
    )
}

export default Navbar