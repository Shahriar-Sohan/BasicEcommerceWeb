import Navbar from "@/component/Navbar"
import SideBar from "./SideBar"
import AllProducts from "./AllProducts"
import Cart from '../../component/Cart'
import ProductOverlay from "@/component/ProductOverlay"

import { useState, useContext } from "react"
import { CartContext } from "@/component/CartContext"
import { OverlayContext } from "@/component/OverlayContext"
import FilterBtnMobile from "@/component/FilterBtnMobile"

function Products() {
    const { cartOpen } = useContext(CartContext)
    const { isOverlayVisible } = useContext(OverlayContext)


    return (
        <div className="min-h-screen bg-gray-50">

            {isOverlayVisible && <ProductOverlay />}
            <Navbar />
            <FilterBtnMobile/>
            <div className="flex flex-col md:flex-row pt-16">
                {cartOpen && <Cart />}
                <SideBar/>
                <AllProducts />
            </div>
        </div>
    )
}

export default Products