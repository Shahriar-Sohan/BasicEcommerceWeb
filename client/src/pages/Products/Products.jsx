import Navbar from "@/component/Navbar"
import SideBar from "./sideBar"
import AllProducts from "./AllProducts"
import Cart from '../../component/Cart'

import { CartContext } from "@/component/CartContext"
import { useContext } from "react"



function Products() {
    const {cartOpen} = useContext(CartContext)
    return (
        <div>
            <Navbar />
            <div className="flex flex-row" >
                {cartOpen && <Cart />}
                <SideBar/>
                <AllProducts/>
            </div>

        </div>
    )
}

export default Products