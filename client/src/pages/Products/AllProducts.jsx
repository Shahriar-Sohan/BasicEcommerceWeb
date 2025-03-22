import { CartContext } from '@/component/CartContext';
import { OverlayContext } from '@/component/OverlayContext';
import { ProductContext } from '@/component/ProductContext';
import { useContext } from 'react';

function AllProducts() {
    const { products } = useContext(ProductContext);
    const { addToCart } = useContext(CartContext);
    const { setProduct, setIsOverlayVisible } = useContext(OverlayContext);
    

    return (
        <div className="w-full md:ml-[18.67%] pt-6 md:pt-8 pb-16 px-4 md:px-6 bg-gray-50">
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-4 md:mb-6">
                Curated Collection
            </h2>
            <div className="w-12 md:w-16 h-px bg-gray-400 mb-6 md:mb-10"></div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map(product => (
                    <div
                        key={product.id}
                        className="cursor-pointer group relative overflow-hidden bg-white border-0 hover:scale-105 active:scale-95 md:active:scale-102 transition-all duration-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] shadow-[0_2px_10px_rgb(0,0,0,0.05)]"
                    >
                        <div className="aspect-square overflow-hidden relative">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                onClick={()=>{
                                    setIsOverlayVisible(true)
                                    setProduct(product)
                                }}
                            />
                            <div className="absolute bottom-0 left-0 w-full p-2 bg-white bg-opacity-90 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                                <p className="text-sm font-medium text-gray-700 uppercase tracking-wider">{product.category}</p>
                            </div>
                        </div>

                        <div className="p-4 md:p-6 bg-white" 
                            onClick={()=>{
                                setIsOverlayVisible(true)
                                setProduct(product)
                            }}
                        >
                            <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-2 line-clamp-2 h-8"
                            
                            >
                                {product.title}
                            </h3>

                            <p className="text-gray-500">{product.gender}</p>
                            <p className="text-gray-700">{product.brand}</p>

                            <div className="flex justify-between items-center gap-2 mt-2">
                                <p className="text-lg md:text-2xl font-bold text-gray-900">
                                    ${product.price.toFixed(2)}
                                </p>
                                <button
                                    className="bg-transparent border border-gray-800  py-2 text-xs md:px-3 md:py-2 md:text-sm text-gray-800 transition-colors active:scale-95 duration-300 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-500 w-full sm:w-auto"
                                    onClick={(e) => {
                                        e.stopPropagation(); 
                                        addToCart(product.id);
                                    }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllProducts;