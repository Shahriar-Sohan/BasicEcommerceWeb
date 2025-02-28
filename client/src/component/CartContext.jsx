import { useState, createContext } from 'react'


export const CartContext = createContext(null)

export function CartProvider({children}){
    const [cartOpen, setCartOpen] = useState(false)
    const [cart, setCart] = useState([])
    
    
    function addToCart(productId, price){
        setCart(prevCart=>([...prevCart,productId]))
    }

    function removeFromCart(productId){

        setCart(prevCart=>{
            let newCart = [...prevCart]
            newCart.splice(newCart.indexOf(productId),1)
            return newCart
        })
        setTotalPrice(prev=>prev-price)
    }


    return(
        <CartContext.Provider value={{cartOpen, setCartOpen, cart, addToCart, removeFromCart }} >
            {children}
        </CartContext.Provider>
    )
}