import { OverlayContext } from "@/component/OverlayContext"
import { ProductContext } from "@/component/ProductContext"
import { useContext } from "react"

function Feature() {
  const { featuredProducts } = useContext(ProductContext)
  const { setProduct, setIsOverlayVisible } = useContext(OverlayContext)

  return (
    <div className="flex flex-col justify-center items-center w-full my-6 md:my-10 px-4 md:px-6 gap-4 md:gap-6">
      <h1 className="text-black text-2xl md:text-4xl">Featured Products</h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 w-full max-w-7xl justify-items-center">
        {featuredProducts.map((card) => (
          <div
            key={card.id}
            className="cursor-pointer p-2 md:p-4 rounded-lg bg-gray-100 shadow-2xl w-full max-w-xs mx-auto active:scale-95 hover:scale-105 hover:ring-2 hover:shadow-2xl transition-shadow duration-50"
            onClick={() => {
              setIsOverlayVisible(true)
              setProduct(card)
            }}
          >
            <img
              src={card.image || "/placeholder.svg"}
              alt={card.title}
              className="w-full h-40 md:h-48 object-cover rounded-md"
            />
            <h3 className="text-lg md:text-xl font-semibold mt-2 md:mt-4">{card.title}</h3>
            <p className="text-gray-500 text-sm md:text-base">{card.gender}</p>
            <p className="font-medium text-base md:text-lg">{card.price}</p>
            <p className="text-gray-700 text-sm md:text-base">{card.brand}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Feature

