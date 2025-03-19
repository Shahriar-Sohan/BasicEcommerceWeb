import Navbar from "@/component/Navbar"
import SideBar from "./SideBar"
import AllProducts from "./AllProducts"
import Cart from '../../component/Cart'

import { CartContext } from "@/component/CartContext"
import { useState, useContext } from "react"

function Products() {
    const { cartOpen } = useContext(CartContext)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            {/* Mobile filter button - only shows on small screens */}
            <button 
                className="md:hidden fixed bottom-4 right-4 z-20 bg-black text-white p-3 rounded-full shadow-lg active:scale-90"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
            </button>
            
            <div className="flex flex-col md:flex-row pt-16">
                {cartOpen && <Cart />}
                <SideBar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <AllProducts />
            </div>
        </div>
    )
}

export default Products