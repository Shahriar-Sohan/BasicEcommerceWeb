import { useContext } from "react"
import { ProductContext } from "@/component/ProductContext"
import { OverlayContext } from "@/component/OverlayContext"
import { Link } from "react-router-dom"

function NewArrivals() {
  const { newArrivals } = useContext(ProductContext)
  const { setProduct, setIsOverlayVisible } = useContext(OverlayContext)

  // 4 most recent new products
  const displayProducts = newArrivals.slice(0, 4)

  //for discount price
  const formatPrice = (price, discount) => {
    if (!discount) return `$${price.toFixed(2)}`

    const discountedPrice = price - price * (discount / 100)

    return (
      <div className="flex items-center gap-2">
        <span className="font-bold">${discountedPrice.toFixed(2)}</span>
        <span className="text-gray-500 line-through text-sm">${price.toFixed(2)}</span>
        <span className="text-red-600 text-sm">-{discount}%</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center items-center w-full my-12 md:my-16 px-4 md:px-6 gap-8 md:gap-12 bg-gray-50 py-12">
      <div className="text-center">
        <h2 className="text-sm font-medium tracking-wider text-red-600 uppercase">Just Landed</h2>
        <h1 className="text-black text-3xl md:text-4xl font-bold mt-2">New Arrivals</h1>
        <div className="w-20 h-1 bg-black mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 w-full max-w-7xl">
        {displayProducts.map((product, index) => (
          <div
            key={product.id}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:scale-105 hover:duration-75 transition-all duration-300 cursor-pointer"
            onClick={() => {
              setIsOverlayVisible(true)
              setProduct(product)
            }}
          >
            <div className="relative">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-48 md:h-64 object-cover"
              />
              <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                NEW
              </div>
              {product.discount > 0 && (
                <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-black text-white text-xs font-bold px-2 py-1 rounded">
                  {product.discount}% OFF
                </div>
              )}
            </div>
            <div className="p-3 md:p-4">
              <div className="flex items-center gap-1 mb-1 md:mb-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 md:w-4 md:h-4 ${i < Math.floor(product.rating) ? "text-yellow-500" : "text-gray-300"}`}
                  >
                    &#9733;
                  </div>
                ))}
                <span className="text-xs text-gray-500 ml-1 mt-1 md:mt-2">({product.rating})</span>
              </div>
              <h3 className="font-semibold text-base md:text-lg line-clamp-1">{product.title}</h3>
              <p className="text-gray-500 text-xs md:text-base">{product.gender}</p>
              <p className="font-medium text-sm md:text-lg">{product.price}</p>
              <p className="text-gray-700 text-xs md:text-base">{product.brand}</p>
              <div className="mt-1 md:mt-2 text-sm md:text-base">{formatPrice(product.price, product.discount)}</div>
            </div>
          </div>
        ))}
      </div>

      <Link to="/products" className="mt-6">
        <button className="flex items-center gap-2 py-3 px-6 bg-black text-white font-medium rounded-md hover:bg-red-600 transition-colors duration-300">
          View All New Arrivals
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
  )
}

export default NewArrivals

