
import { createContext, useEffect, useState } from 'react'

export const ProductContext = createContext(null)

export function ProductsProvider({children}){

    

    const featuredProductId = [1,2,3,4,7]


    const [products, setProducts ] = useState([])
    const [featuredProducts, setFeaturedProducts] = useState([])
    const [brands, setBrands] = useState([])
    const [categories, setCategories] = useState([])
    const [filter, setFilter] = useState("")

    // switch (filter) {
    //     case value1:
    //       // Code to execute if expression === value1
    //       break;
    //     case value2:
    //       // Code to execute if expression === value2
    //       break;
    //     default:
    //       // Code to execute if none of the cases match
    //   }

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
        <ProductContext.Provider value={{products, featuredProducts, brands, categories, setFilter}} >
            {children}
        </ProductContext.Provider>
    )
}

