import { useContext, useEffect } from "react"
import { CartContext } from "./CartContext"
import Quantity from "./Quantity"

function Cart() {
    const { setCartOpen, cart, addToCart, removeFromCart, cartProducts, totalPrice } = useContext(CartContext)


    const handleOutsideClick = (e) => {
        if (e.target.id === "cart-overlay") {
            setCartOpen(false);
        }
    };

    return (
        <div
            id="cart-overlay"
            className="fixed inset-0 z-30 bg-black/30 flex justify-end"
            onClick={handleOutsideClick}
        >
            <div
                className="pt-20 h-full w-80 bg-stone-100 text-black p-8 shadow-lg rounded-l-3xl fixed right-0 flex justify-start items-center flex-col overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="fixed flex flex-col items-end justify-center w-80 top-0 h-20 pt-10 bg-stone-100" >
                    <button
                        className="pr-8 pt-6 flex justify-end items-center size-10 text-2xl text-gray-600 active:scale-90 hover:text-gray-800"
                        onClick={() => setCartOpen(false)}
                    >
                        x
                    </button>
                    <h2 className=" pr-18 pb-4 text-2xl font-bold mb-8 uppercase">Shopping Cart</h2>
                </div>


                {cartProducts.map(product => {
                    const quantity = Quantity(cart, product.id);
                    const productPrice = product.price * quantity;

                    return (
                        <div className="cart-item flex justify-between items-center w-full py-3 border-b border-gray-700" key={product.id}>
                            <div className="flex gap-2">
                                <img className="size-10 rounded-md aspect-square" src={product.image} alt="" />
                                <span className="item-name text-lg">{product.title}</span>
                            </div>

                            <div className="flex flex-col justify-center items-center">
                                <span className="font-medium">{productPrice.toFixed(2)}$</span>
                                <div className="flex flex-row justify-center items-center gap-2">
                                    <button
                                        className="size-6 p-3 bg-gray-600 text-white rounded-full text-base flex items-center justify-center active:scale-80 hover:bg-gray-500 transition-all duration-300"
                                        onClick={() => removeFromCart(product.id)}
                                    >
                                        -
                                    </button>
                                    <span className="item-quantity">x{quantity}</span>
                                    <button
                                        className="size-6 p-3 bg-gray-600 text-white rounded-full text-base flex items-center justify-center active:scale-80 hover:bg-gray-500 transition-all duration-300"
                                        onClick={() => addToCart(product.id)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}



                <div className="fixed mt-8 flex flex-col justify-center items-center bg-stone-100 h-30 w-80 bottom-0">
                    <span className="pl-39 py-3 border-t-1  w-65 font-bold">Total: {totalPrice.toFixed(2)}$</span>
                    <button className="mb-4 py-3 px-6 text-xl bg-gray-800 text-white border border-gray-700 rounded-full active:scale-95 hover:bg-gray-500 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-600 disabled:text-gray-400 disabled:border-gray-600 disabled:cursor-not-allowed disabled:transform-none disabled:pointer-events-none"
                        disabled={cart.length ? false : true}>
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cart;