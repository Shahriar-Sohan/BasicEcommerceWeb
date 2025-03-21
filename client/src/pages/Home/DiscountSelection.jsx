import { useContext } from "react"
import { ProductContext } from "@/component/ProductContext"
import { OverlayContext } from "@/component/OverlayContext"
import { Link } from "react-router-dom"

function DiscountSection() {
  const { discountedProducts } = useContext(ProductContext)
  const { setProduct, setIsOverlayVisible } = useContext(OverlayContext)

  //top 3 discounted products
  const topDiscounts = discountedProducts.slice(0, 3)

  //calculate discounted price
  const calculateDiscountedPrice = (price, discount) => {
    return price - price * (discount / 100)
  }

  return (
    <div className="w-full bg-red-600 py-12 md:py-16 my-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-sm font-medium tracking-wider text-white uppercase">Limited Time</h2>
          <h1 className="text-white text-3xl md:text-4xl font-bold mt-2">Special Offers</h1>
          <div className="w-20 h-1 bg-white mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {topDiscounts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              onClick={() => {
                setIsOverlayVisible(true)
                setProduct(product)
              }}
            >
              <div className="relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-40 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-0 right-0 bg-red-600 text-white font-bold px-2 py-1 md:px-4 md:py-2 rounded-bl-lg">
                  <div className="flex items-center gap-1">
                    <span className="text-xs md:text-base">{product.discount}% OFF</span>
                  </div>
                </div>
              </div>
              <div className="p-3 md:p-4">
                <h3 className="font-semibold text-base md:text-lg">{product.title}</h3>
                <p className="text-gray-600 text-xs md:text-sm">{product.brand}</p>
                <div className="mt-2 md:mt-3 flex items-end gap-1 md:gap-2">
                  <span className="text-lg md:text-2xl font-bold text-red-600">
                    ${calculateDiscountedPrice(product.price, product.discount).toFixed(2)}
                  </span>
                  <span className="text-gray-500 line-through text-xs md:text-sm">${product.price.toFixed(2)}</span>
                </div>
                <button className="w-full mt-2 md:mt-4 bg-black hover:bg-red-600 text-white py-1 md:py-2 rounded-md transition-colors duration-300 text-sm md:text-base">
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/products">
            <button className="inline-flex items-center gap-2 py-3 px-6 bg-white text-red-600 font-medium rounded-md hover:bg-black hover:text-white transition-colors duration-300">
              View All Deals
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DiscountSection

