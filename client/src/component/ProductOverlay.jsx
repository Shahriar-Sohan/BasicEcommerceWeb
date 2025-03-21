import { useContext } from "react"
import { OverlayContext } from "./OverlayContext"
import { CartContext } from "./CartContext"

const Overlay = ({ setIsOverlayVisible }) => (
    <div className="fixed inset-0 bg-black/70 z-30 backdrop-blur-xs" onClick={() => setIsOverlayVisible(false)}></div>
)

function ProductOverlay() {
    const { setIsOverlayVisible, product } = useContext(OverlayContext);
    const { addToCart } = useContext(CartContext);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Overlay with background blur */}
            <Overlay setIsOverlayVisible={setIsOverlayVisible} />

            {/* Modal content */}
            <div className="relative flex flex-col md:flex-row w-[90%] max-w-4xl bg-white rounded-xl overflow-hidden shadow-xl z-40">
                {/* Left Side of Overlay */}
                <div className="relative w-full md:w-1/2 h-[300px] md:h-[600px]">
                    <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
                    {product.isNew && (
                        <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm font-medium">
                            New Arrival
                        </div>
                    )}
                    {product.discount > 0 && (
                        <div className="absolute top-4 right-14 bg-red-600 text-white px-3 py-1.5 rounded-md text-sm font-medium">
                            {product.discount}% OFF
                        </div>
                    )}
                </div>

                {/* Right Side of Overlay */}
                <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col bg-white">
                    <button className="absolute flex justify-center items-center size-10 top-4 right-4 text-2xl text-gray-600 active:scale-80 hover:text-gray-800"
                        onClick={() => setIsOverlayVisible(false)}
                    >
                        x
                    </button>
                    <div className="mb-3">
                        <div className="inline-block border border-gray-200 text-xs uppercase tracking-wider px-3 py-1 mb-2 rounded-md">
                            {product.category}
                        </div>
                        <h2 className="text-xl md:text-3xl font-bold text-gray-900 mt-2">{product.name}</h2>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className={`w-3.5 h-3.5 md:w-4 md:h-4 ${i < Math.floor(product.rating) ? "text-yellow-500" : "text-gray-300"}`}
                            >
                                &#9733;
                            </div>
                        ))}
                        <span className="text-xs md:text-sm ml-1 mt-2 text-gray-600">{product.rating.toFixed(1)} (120 reviews)</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 md:gap-3 mb-3 md:mb-4">
                        {product.discount > 0 ? (
                            <>
                                <span className="text-xl md:text-2xl font-bold text-gray-900">
                                    ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                                </span>
                                <span className="text-base md:text-lg text-gray-500 line-through">${product.price.toFixed(2)}</span>
                            </>
                        ) : (
                            <span className="text-xl md:text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                        )}
                    </div>

                    {/* Description */}
                    <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">{product.description}</p>

                    {/* Color Selection */}
                    <div className="mb-4 md:mb-6">
                        <h3 className="text-sm font-medium text-gray-900 mb-2 md:mb-3">Color</h3>
                        <div className="flex gap-3">
                            {product.availableColors.map((color) => (
                                <div key={color.name} className="group relative">
                                    <button
                                        className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        style={{ backgroundColor: color.hex }}
                                        aria-label={`Select ${color.name} color`}
                                    />
                                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                        {color.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Size Selection */}
                    <div className="mb-6 md:mb-8">
                        <div className="flex justify-between items-center mb-2 md:mb-3">
                            <h3 className="text-sm font-medium text-gray-900">Size</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {product.availableSizes.map((size) => (
                                <button
                                    key={size}
                                    className="min-w-[2.5rem] md:min-w-[3rem] h-9 md:h-10 px-2 md:px-3 border border-gray-200 rounded-md text-sm font-medium hover:border-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Add to Cart */}
                    <div className="flex gap-2 md:gap-3 mt-auto">
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 md:py-3 px-4 rounded-lg flex items-center justify-center font-medium text-sm md:text-base active:scale-90"
                        onClick={()=>{
                            addToCart(product.id)
                            setIsOverlayVisible(false)
                        }}
                        >
                            <svg className="mr-1.5 md:mr-2 h-4 w-4 md:h-5 md:w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 2L6 6H18L18 2" />
                                <path d="M3 6L5 21C5 21.55 5.45 22 6 22H18C18.55 22 19 21.55 19 21L21 6" />
                                <path d="M10 12H14" />
                            </svg>
                            Add to Cart
                        </button>
                        <button className="p-2.5 md:p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                            <svg className="h-4 w-4 md:h-5 md:w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 21C12 21 7 16.5 5 14C3 12 3 9 5 7C6.69 5.31 9.28 5.31 12 7C14.72 5.31 17.31 5.31 19 7C21 9 21 12 19 14C17 16.5 12 21 12 21Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductOverlay

