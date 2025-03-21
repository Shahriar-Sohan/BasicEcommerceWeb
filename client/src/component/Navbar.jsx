import Cart from "../assets/Cart.gif"
import StaticCart from "../assets/StaticCart.png"
import ProfilePic from "../assets/person.svg"

import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "./CartContext"

function Navbar() {
  const [isHovered, setIsHovered] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { setCartOpen, cart } = useContext(CartContext)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <nav className="flex flex-row justify-between items-center w-full p-3 bg-white fixed z-20">
      {/* Mobile menu button */}
      <button
        className="md:hidden flex flex-col justify-center items-center gap-1 pl-1.5"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-0.5 bg-black transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-black transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-black transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
        ></span>
      </button>

      {/* Logo */}
      <h2 className="text-red-800 pl-6 md:pl-4 text-4xl md:text-4xl group active:scale-95 md:active:scale-100">
        <Link to="/" className="relative hover:text-blue-500 group-hover:scale-100 active:scale-95 transition-transform duration-200">
          RivalRay
        </Link>
      </h2>

      {/* NavList - hidden on mobile unless menu is open */}
      <ul
        className={`absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent py-4 md:py-0 md:ml-35 md:text-2xl flex flex-col md:flex-row gap-5 items-center justify-center transition-all duration-300 ${mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible md:opacity-100 md:visible"} md:flex`}
      >
        <li className="py-2 md:py-0 border-b-1 md:border-0 border-black w-20 text-center md:hover:scale-105 active:scale-80 md:active:scale-95 hover:text-blue-500 transition-all duration-50">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-500">
            Home
          </Link>
        </li>
        <li className="py-2 md:py-0 border-b-1 md:border-0 border-black w-20 text-center md:hover:scale-105 active:scale-80 md:active:scale-95 hover:text-blue-500 transition-all duration-50">
          <Link to="/products" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-500 ">
            Products
          </Link>
        </li>
        <li className="py-2 md:py-0 border-b-1 md:border-0 border-black w-20 text-center md:hover:scale-105 active:scale-80 md:active:scale-95 hover:text-blue-500 transition-all duration-50">
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-500">
            About
          </Link>
        </li>

        {/* Mobile-only buttons */}
        <li className="py-2 md:hidden w-full flex flex-col gap-3 mt-2">
          <button className="text-sm font-medium hover:text-red-800 hover:scale-105 transition-all">Login</button>
          <button className="bg-red-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-900 active:scale-95 transition-all mx-auto w-32">
            Get Started
          </button>
        </li>
      </ul>

      {/* Cart and ProfilePic */}
      <div className="flex flex-row gap-6 mr-2 items-center">
        {/* Login button - hidden on mobile */}
        <Link to="/login">
        <button className="hidden md:block text-lg font-medium hover:text-red-800 hover:scale-110 transition-all duration-50">Login</button>
        </Link>
        

        {/* Get Started button - hidden on mobile */}
        <button className="hidden md:block bg-red-800 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-red-900 active:scale-95 md:hover:scale-105 transition-all duration-50">
          Get Started
        </button>
        {/* Cart */}
        <div className="flex justify-center items-center cursor-pointer pr-1.5 " onClick={() => setCartOpen(true)}>
          <img
            className="size-6 md:size-8 relative "
            src={isHovered ? Cart : StaticCart}
            alt="Cart"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
          <span className="flex justify-center items-center bg-white border-1 text-black text-sm md:text-lg size-5 md:size-6 top-[59%] md:top-[57%] right-4 md:right-16 rounded-full absolute active:scale-95">
            {cart.length}
          </span>
        </div>

        {/* ProfilePic - hidden on smaller screens */}
        <img className="size-6 md:size-8 hidden sm:block" src={ProfilePic || "/placeholder.svg"} alt="ProfilePic" />
      </div>
    </nav>
  )
}

export default Navbar
