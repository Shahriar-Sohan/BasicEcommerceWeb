import Navbar from "@/component/Navbar"
import SideBar from "./SideBar"
import AllProducts from "./AllProducts"
import Cart from '../../component/Cart'
import ProductOverlay from "@/component/ProductOverlay"

import { useContext, useEffect } from "react"
import { CartContext } from "@/component/CartContext"
import { OverlayContext } from "@/component/OverlayContext"
import FilterBtnMobile from "@/component/FilterBtnMobile"
import Footer from "@/component/Footer"

function Products() {
    const { cartOpen,  } = useContext(CartContext)
    const { isOverlayVisible } = useContext(OverlayContext)

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [checkedItems])

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {isOverlayVisible && <ProductOverlay />}
            <Navbar />
            <FilterBtnMobile/>
            
            <div className="flex flex-col md:flex-row pt-16 flex-grow">
                {cartOpen && <Cart />}
                <SideBar/>
                <AllProducts />
            </div>
            
            <Footer />
        </div>
    )
}

export default Products