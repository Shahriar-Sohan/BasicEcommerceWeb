
import { createContext, useEffect, useState } from 'react'

export const ProductContext = createContext(null)

export function ProductsProvider({children}){

    

    const featuredProductId = [1,2,3,4,7]


    const [products, setProducts ] = useState([])
    const [featuredProducts, setFeaturedProducts] = useState([])
    const [brands, setBrands] = useState([])
    const [categories, setCategories] = useState([])


    useEffect(()=>{
        fetch('/product.json')
            .then(response=>response.json())
            .then(data=>{
                setProducts(data)
                setFeaturedProducts(data.filter(product=>featuredProductId.includes(product.id)))
                setBrands([... new Set(data.map(product => product.brand))])
                setCategories([... new Set(data.map(product => product.category))])
            })
            .catch(error => console.error('Error fetching product data:',error));
    },[])

    return (
        <ProductContext.Provider value={{products, featuredProducts, brands, categories}} >
            {children}
        </ProductContext.Provider>
    )
}

