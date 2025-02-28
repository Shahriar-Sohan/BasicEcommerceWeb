import { useEffect, useState } from 'react'


function Feature(){

    const featuredProductId = [1,2,3,4]
    const [products, setProducts] = useState([])

    
    useEffect(()=>{
        fetch('/product.json')
            .then(response=>response.json())
            .then(data=>{
                setProducts(data.filter(product=>featuredProductId.includes(product.id)))
            })
            .catch(error => console.error('Error fetching product data:',error));
    },[])

    return(
        <div className="flex flex-col justify-center items-center w-full my-10 gap-6">
            <h1 className="text-black text-4xl">Featured Products</h1>
            <div className="flex gap-6">
                {products.map(card => (
                    <div key={card.id} className="border p-4 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 w-60">
                        <img src={card.image} alt={card.title} className="w-full h-48 object-cover rounded-md" />
                        <h3 className="text-xl font-semibold mt-4">{card.title}</h3>
                        <p className="text-gray-500">{card.gender}</p>
                        <p className="font-medium text-lg">{card.price}</p>
                        <p className="text-gray-700">{card.brand}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Feature