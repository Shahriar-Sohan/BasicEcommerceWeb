import { useState, createContext } from 'react'


export const CartContext = createContext(null)

export function CartProvider({children}){
    const [cartOpen, setCartOpen] = useState(false)




    return(
        <CartContext.Provider value={{cartOpen, setCartOpen}} >
            {children}
        </CartContext.Provider>
    )
}