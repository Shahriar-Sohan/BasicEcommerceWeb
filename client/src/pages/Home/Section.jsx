import { useContext } from "react"
import { ProductContext } from "@/component/ProductContext"
import { Link } from "react-router-dom"

function Section() {
  const { MainCategories, brands, setCheckedItems } = useContext(ProductContext)

  function handleClick(title) {
    setCheckedItems((prev) => ({ ...prev, [title]: true }))
  }

  return (
    <div className="flex flex-col justify-center items-center w-full my-12 md:my-16 px-4 pt-5 md:px-6 gap-8 md:gap-12">
      <div className="text-center">
        <h2 className="text-sm font-medium tracking-wider text-red-600 uppercase">Categories</h2>
        <h1 className="text-black text-3xl md:text-4xl font-bold mt-2">Shop By Category</h1>
        <div className="w-20 h-1 bg-black mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 w-full max-w-7xl">
        {MainCategories.map((category, index) => (
          <Link to="/products" key={category.title}>
            <div
              className="flex flex-col items-center justify-center gap-3 md:gap-5 border-solid border p-4 md:p-8 border-gray-200 rounded-lg shadow-md hover:shadow-xl cursor-pointer active:scale-95 hover:scale-105 hover:border-red-600 transition-all duration-300"
              onClick={() => handleClick(category.title)}
            >
              <div className="bg-gray-100 rounded-full p-3 md:p-5">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.altText}
                  className="w-12 h-12 md:w-16 md:h-16"
                />
              </div>
              <h2 className="text-lg md:text-xl font-semibold text-center">{category.title}</h2>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-8 md:mt-16">
        <h2 className="text-sm font-medium tracking-wider text-red-600 uppercase">Brands</h2>
        <h1 className="text-black text-3xl md:text-4xl font-bold mt-2">Shop By Brand</h1>
        <div className="w-20 h-1 bg-black mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-7xl">
        {brands.map((brand, index) => (
          <Link to="/products" key={brand}>
            <div
              className="flex flex-col items-center justify-center gap-2 md:gap-5 border-solid border p-6 md:p-8 border-gray-200 rounded-lg shadow-md hover:shadow-xl active:scale-95 hover:scale-105 hover:border-red-600 transition-all duration-300 cursor-pointer"
              onClick={() => handleClick(brand)}
            >
              <h2 className="text-lg md:text-xl font-semibold text-center">{brand}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Section

