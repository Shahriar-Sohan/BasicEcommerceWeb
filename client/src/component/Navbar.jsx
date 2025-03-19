import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from './CartContext'

import Cart from '../assets/Cart.Gif'
import StaticCart from '../assets/StaticCart.png'
import ProfilePic from '../assets/person.svg'



function Navbar() {
    const [isHovered, setIsHovered] = useState(false)
    const { setCartOpen, cart } = useContext(CartContext)
    


    return (
        <nav className='flex flex-row justify-between items-center w-full p-3 bg-white fixed z-10' >

            {/* Icons and searchBar */}
            <div className='flex flex-row gap-10 pl-3' >
                <h2 className='text-black text-4xl' ><Link to='/' >RivalRay</Link></h2>
                {/* <input className='text-black bg-stone-200 px-5 rounded-4xl w-[25vw]' type='text' placeholder='Searchbar is on development...' /> */}
            </div>

            {/* NavList */}
            <ul className='flex flex-row gap-5 '>
                <li><Link to='/' >Home</Link></li>
                <li><Link to='/products' >Products</Link></li>
                <li><Link to='/about' >About</Link></li>
            </ul>

            {/* Cart and ProfliePic */}
            <div className='flex flex-row gap-4 mr-4'>

                {/* Cart */}
                <div className='flex justify-center items-center cursor-pointer'
                    onClick={()=>setCartOpen(true)} >
                    <img className='size-8 relative'
                        src={isHovered ? Cart : StaticCart} alt='Cart'
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        
                    />
                    <span className='flex justify-center items-center bg-white border-1 text-black size-6 top-[60%] right-14 rounded-full absolute'>
                        {cart.length}
                    </span>
                </div>

                {/* ProfilePic */}
                <img className='size-8'
                    src={ProfilePic} alt='ProfilePic' />
            </div>
        </nav>
    )
}

export default Navbar