import { CartContext } from '@/component/CartContext';
import { ProductContext } from '@/component/ProductContext';
import { useContext, useEffect, useState } from 'react';


function AllProducts() {

    const { products } = useContext(ProductContext)
    const { addToCart } = useContext(CartContext)
    



    return (
        <div className="ml-[16.67%] mt-15 flex-1 px-4 py-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                
                {products.map(product => (
                    <div
                        key={product.id}
                        className="cursor-pointer group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md"
                    >
                        <div className="aspect-square overflow-hidden">
                            <img
                                src={product.image }
                                alt={product.title}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div className="p-4">
                            <p className="text-sm text-gray-500">{product.category}</p>
                            <h3 className="mt-1 text-lg font-medium text-gray-900">
                                {product.title}
                            </h3>
                            <p className="mt-2 text-xl font-semibold text-gray-900">
                                ${product.price.toFixed(2)}
                            </p>
                            <button className="mt-4 w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black/25"
                                onClick={()=>addToCart(product.id)} >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
                
            </div>
        </div>
    )
}
export default AllProducts
