import { useContext } from "react";
import { ProductContext } from "@/component/ProductContext";
import { OverlayContext } from "@/component/OverlayContext";

function SideBar() {
    const { brands, categories, setCheckedItems, checkedItems } = useContext(ProductContext)
    const {filterSidebar, setFilterSidebar} = useContext(OverlayContext)
    
    function categoryCheckbox(event){
        const { id, checked } = event.target
        setCheckedItems(prevState => (
            { ...prevState, [id]: checked }
        ))
    }

    
    const Overlay = () => (
        <div 
            className="md:hidden fixed top-16 left-0 right-0 bottom-0 bg-black/20 bg-opacity-20 z-30"
        onClick={() => setFilterSidebar(false)}
        ></div>
    );

    return (
        <>
            {filterSidebar && <Overlay />}
            
            <div className={`
                fixed top-14 md:fixed md:top-16 md:left-0 z-40 md:z-5 bg-white
                h-[calc(100vh-3rem)] md:h-screen w-2/4 md:w-1/6 md:max-w-xs
                transition-transform duration-300 ease-in-out
                ${filterSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                p-6 md:p-10 overflow-y-auto
                shadow-lg md:shadow-none
                flex flex-col gap-6`}
            >
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-lg font-bold border-b pb-2 w-full text-center">
                        Filter
                    </h1>
                    <button 
                        className="md:hidden text-gray-500 active:scale-80"
                        onClick={() => setFilterSidebar(false)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="w-full">
                    <h2 className="font-semibold mb-2">Category</h2>
                    <ul className="flex flex-col gap-2">
                        {categories.map((category) => (
                            <li key={category} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    className="cursor-pointer w-5 h-5 border-2 border-black accent-black"
                                    type="checkbox"
                                    id={category}
                                    onChange={categoryCheckbox}
                                    checked={checkedItems[category] || false}
                                />
                                <label htmlFor={category} className="cursor-pointer text-black">
                                    {category}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="w-full">
                    <h2 className="font-semibold mb-2 mt-4">Brand</h2>
                    <ul className="flex flex-col gap-2">
                        {brands.map((brand) => (
                            <li key={brand} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    className="cursor-pointer w-5 h-5 border-2 border-black accent-black"
                                    type="checkbox"
                                    id={brand}
                                    onChange={categoryCheckbox}
                                    checked={checkedItems[brand] || false}
                                />
                                <label htmlFor={brand} className="cursor-pointer text-black">
                                    {brand}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default SideBar;