import { Link } from "react-router-dom"
import { useContext } from "react"
import { ProductContext } from "@/component/ProductContext"

function PromoBanner() {
  const { discountedProducts } = useContext(ProductContext)

  const highestDiscount =
    discountedProducts.length > 0 ? Math.max(...discountedProducts.map((product) => product.discount)) : 0

  return (
    <div className="w-full bg-black text-white py-3 px-4 md:px-6 mt-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
        <div className="flex items-center gap-2">
          <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">SALE</span>
          <p className="text-sm md:text-base">Summer Sale: Up to {highestDiscount}% off on selected items</p>
        </div>
        <Link to="/products">
          <button className="text-sm underline hover:text-red-400 transition-colors duration-300">Shop Now</button>
        </Link>
      </div>
    </div>
  )
}

export default PromoBanner

