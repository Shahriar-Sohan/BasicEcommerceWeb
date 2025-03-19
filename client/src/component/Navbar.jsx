import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from './CartContext'

import Cart from '../assets/Cart.gif'
import StaticCart from '../assets/StaticCart.png'
import ProfilePic from '../assets/person.svg'

function Navbar() {
    const [isHovered, setIsHovered] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { setCartOpen, cart } = useContext(CartContext)

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    return (
        <nav className='flex flex-row justify-between items-center w-full p-3 bg-white fixed z-20'>
            {/* Mobile menu button */}
            <button
                className='md:hidden flex flex-col justify-center items-center gap-1 pl-1.5'
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
            >
                <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>

            {/* Logo */}
            <h2 className='text-red-800 pl-2 md:pl-4 text-4xl md:text-4xl group'>
                <Link to='/' className='relative  group-hover:scale-100 active:scale-95 transition-transform duration-200'>
                    RivalRay
                </Link>
            </h2>



            {/* NavList - hidden on mobile unless menu is open */}
            <ul className={`absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent py-4 md:py-0 md:text-2xl flex flex-col md:flex-row gap-5 items-center justify-center transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible md:opacity-100 md:visible'} md:flex`}>
                <li className="py-2 md:py-0 border-b-1 border-black w-20 text-center">
                    <Link to='/' onClick={() => setMobileMenuOpen(false)}>Home</Link>
                </li>
                <li className="py-2 md:py-0 border-b-1 border-black w-20 text-center">
                    <Link to='/products' onClick={() => setMobileMenuOpen(false)}>Products</Link>
                </li>
                <li className="py-2 md:py-0 border-b-1 border-black w-20 text-center">
                    <Link to='/about' onClick={() => setMobileMenuOpen(false)}>About</Link>
                </li>
            </ul>

            {/* Cart and ProfilePic */}
            <div className='flex flex-row gap-6 mr-2 '>
                {/* Cart */}
                <div className='flex justify-center items-center cursor-pointer pr-1.5 '
                    onClick={() => setCartOpen(true)}>
                    <img className='size-6 md:size-8 relative '
                        src={isHovered ? Cart : StaticCart} alt='Cart'
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    />
                    <span className='flex justify-center items-center bg-white border-1 text-black text-sm md:text-lg size-5 md:size-6 top-[59%] md:top-[57%] right-4 md:right-16 rounded-full absolute active:scale-95'>
                        {cart.length}
                    </span>
                </div>



                {/* ProfilePic - hidden on smaller screens */}
                <img className='size-6 md:size-8 hidden sm:block'
                    src={ProfilePic} alt='ProfilePic' />
            </div>
        </nav>
    )
}

export default Navbar