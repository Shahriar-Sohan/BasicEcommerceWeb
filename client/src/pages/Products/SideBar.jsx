import { categories, brands } from "../Home/Section"; 

function SideBar() {
    return (
        <div className="h-screen flex flex-col w-1/6 fixed mt-15 p-10 gap-6 z-5 ">
            <h1 className="text-lg font-bold mb-2 border-b pb-2 w-full text-center">
                Filter
            </h1>

            <div className="w-full">
                <h2 className="font-semibold mb-2">Category</h2>
                <ul className="flex flex-col gap-2">
                    {categories.map((category) => (
                        <li key={category.title} className="flex items-center gap-2 cursor-pointer">
                            <input
                                className="cursor-pointer w-5 h-5 border-2 border-black accent-black"
                                type="checkbox"
                                id={category.title}
                            />
                            <label htmlFor={category.title} className="cursor-pointer text-black">
                                {category.title}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="w-full">
                <h2 className="font-semibold mb-2 mt-4">Brand</h2>
                <ul className="flex flex-col gap-2">
                    {brands.map((brand) => (
                        <li key={brand.title} className="flex items-center gap-2 cursor-pointer">
                            <input
                                className="cursor-pointer w-5 h-5 border-2 border-black accent-black"
                                type="checkbox"
                                id={brand.title}
                            />
                            <label htmlFor={brand.title} className="cursor-pointer text-black">
                                {brand.title}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SideBar;