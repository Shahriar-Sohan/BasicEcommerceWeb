




function Cart() {
    return (
        <div className="z-20 h-full w-80 bg-stone-100 text-black p-8 shadow-lg rounded-l-3xl fixed right-0 flex justify-start items-center flex-col" >
            <button
                className="absolute flex justify-center items-center size-10 top-4 right-4 text-2xl text-gray-600 hover:text-gray-800"
            >
                x
            </button>
            <h2 className="text-2xl font-bold mb-8 uppercase">Shopping Cart</h2>

            <div className="cart-item flex justify-between w-full py-3 border-b border-gray-700">
                <span className="item-name text-lg ">Item 1</span>
                <div className="flex flex-row justify-center items-center gap-2" >

                    <button className="size-6 p-3 bg-gray-600 text-white rounded-full text-base flex items-center justify-center hover:bg-gray-500 transition-all duration-300">
                        -
                    </button>
                    <span className="item-quantity ">x1</span>
                    <button className="size-6 p-3 bg-gray-600 text-white rounded-full text-base flex items-center justify-center hover:bg-gray-500 transition-all duration-300">
                        +
                    </button>

                </div>

            </div>

            <div className="cart-footer mt-8 text-center">
                <button className="checkout-button py-3 px-6 text-xl bg-gray-800 text-white border border-gray-700 rounded-full hover:bg-gray-500 transition-all duration-300 transform hover:scale-105">
                    Checkout
                </button>
            </div>
        </div>
    )
}


export default Cart