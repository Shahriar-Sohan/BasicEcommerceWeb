import { createContext, useEffect, useState } from 'react'

export const ProductContext = createContext(null)

export function ProductsProvider({children}){

    

    const featuredProductId = [1,2,3,4,7]


    const [products, setProducts ] = useState([])
    const [featuredProducts, setFeaturedProducts] = useState([])
    const [cartProducts, setCartProducts] = useState([])



    useEffect(()=>{
        fetch('/product.json')
            .then(response=>response.json())
            .then(data=>{
                setProducts(data)
                setFeaturedProducts(data.filter(product=>featuredProductId.includes(product.id)))
            })
            .catch(error => console.error('Error fetching product data:',error));
    },[])

    return (
        <ProductContext.Provider value={{products, featuredProducts}} >
            {children}
        </ProductContext.Provider>
    )
}

