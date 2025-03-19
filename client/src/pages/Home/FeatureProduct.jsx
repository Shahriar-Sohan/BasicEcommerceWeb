import { ProductContext } from '@/component/ProductContext'
import { useContext } from 'react'

function Feature(){
    const {featuredProducts} = useContext(ProductContext)

    return(
        <div className="flex flex-col justify-center items-center w-full my-6 md:my-10 px-4 md:px-6 gap-4 md:gap-6">
            <h1 className="text-black text-2xl md:text-4xl">Featured Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-7xl">
                {featuredProducts.map(card => (
                    <div key={card.id} className="cursor-pointer border p-3 md:p-4 rounded-lg drop-shadow-md hover:shadow-xl transition-all duration-300 w-full">
                        <img src={card.image} alt={card.title} className="w-full h-36 md:h-48 object-cover rounded-md" />
                        <h3 className="text-lg md:text-xl font-semibold mt-3 md:mt-4">{card.title}</h3>
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