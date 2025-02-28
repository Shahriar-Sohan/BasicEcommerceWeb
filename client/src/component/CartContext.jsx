import { useState, useEffect, createContext } from 'react'
import ExtractPrice from "./PriceExtractor"


export const CartContext = createContext(null)

export function CartProvider({children}){
    const [cartOpen, setCartOpen] = useState(false)
    const [cart, setCart] = useState([])
    const [cartProducts, setCartProducts] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)


    useEffect(() => {
        fetch('/product.json')
            .then(response => response.json())
            .then(data => {
                setCartProducts(data.filter(product => cart.includes(product.id)))
                setTotalPrice(ExtractPrice(data, cart))
            })
    }, [cart])


    
    
    function addToCart(productId, price){
        setCart(prevCart=>([...prevCart,productId]))
    }

    function removeFromCart(productId){

        setCart(prevCart=>{
            let newCart = [...prevCart]
            newCart.splice(newCart.indexOf(productId),1)
            return newCart
        })
    }


    return(
        <CartContext.Provider value={{cartOpen, setCartOpen, cart, addToCart, removeFromCart, cartProducts, totalPrice }} >
            {children}
        </CartContext.Provider>
    )
}