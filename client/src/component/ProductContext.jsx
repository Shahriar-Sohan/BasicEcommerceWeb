import accessories from '../assets/accessories.png';
import men from '../assets/men.png';
import women from '../assets/women.png';
import kids from '../assets/kid.png';
import shoe from '../assets/shoe.png';



import { createContext, useEffect, useState } from 'react'

export const ProductContext = createContext(null)

export function ProductsProvider({children}){

    

    const featuredProductId = [1,2,3,4,7]


    const [products, setProducts ] = useState([])
    const [featuredProducts, setFeaturedProducts] = useState([])
    const [brands, setBrands] = useState([])
    const [categories, setCategories] = useState([])
    const [discountedProducts, setDiscountedProducts] = useState([])
    const [newArrivals, setNewArrivals] = useState([])
    

    const [checkedItems, setCheckedItems] = useState({})

    useEffect(()=>{
        fetch('/product.json') //mock api from public folder
            .then(response=>response.json())
            .then(data=>{
                const filteredProducts = data.filter(product => checkedItems[product.category] || checkedItems[product.brand] )
                setDiscountedProducts(data.filter((product) => product.discount > 0).sort((a, b) => b.discount - a.discount))
                setNewArrivals(data.filter((product) => product.isNew))
                setProducts(filteredProducts.length > 0 ? filteredProducts : data)
                setFeaturedProducts(data.filter(product=>featuredProductId.includes(product.id)))
                setBrands([... new Set(data.map(product => product.brand))])
                setCategories([... new Set(data.map(product => product.category))])
            })
            .catch(error => console.error('Error fetching product data:',error));
    },[checkedItems])


    // Extract unique categories
    const MainCategories = [
    { title: "Men", image: men, altText: "Men" },
    { title: "Women", image: women, altText: "Women" },
    { title: "Kids", image: kids, altText: "Kids" },
    { title: "Accessories", image: accessories, altText: "Accessories" },
    { title: "Footwear", image: shoe, altText: "Footwear" },
  ]

    return (
        <ProductContext.Provider value={{
            products,
            featuredProducts, 
            brands, 
            categories, 
            setCheckedItems, 
            checkedItems, 
            discountedProducts,
            MainCategories,
            newArrivals
            }} >
            {children}
        </ProductContext.Provider>
    )
}

