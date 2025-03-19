import { useContext } from 'react';
import accessories from '../../assets/accessories.png';
import men from '../../assets/men.png';
import women from '../../assets/women.png';
import kids from '../../assets/kid.png';
import shoe from '../../assets/shoe.png';
import { ProductContext } from '@/component/ProductContext';



const categories = [
    { title: 'Men', image: men, altText: 'Men' },
    { title: 'Women', image: women, altText: 'Women' },
    { title: 'Kids', image: kids, altText: 'Kids' },
    { title: 'Accessories', image: accessories, altText: 'Accessories' },
    { title: 'Footwear', image: shoe, altText: 'Footwear' }
];


function Section() {

    const { brands } = useContext(ProductContext)
    


    return (
        <div className="flex flex-col justify-center items-center w-full my-6 md:my-10 px-4 pt-5 md:px-6 gap-4 md:gap-6">
            <h1 className="text-black text-2xl md:text-4xl">Shop By Category</h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5 w-full max-w-7xl">
                {categories.map((category) => (
                    <div
                        className="flex flex-col items-center justify-center gap-2 md:gap-5 border-solid border p-3 md:p-8 border-black rounded-md"
                        key={category.title}
                    >
                        <h2 className="text-lg md:text-2xl font-bold text-center">{category.title}</h2>
                        <img src={category.image} alt={category.altText} className="w-12 h-12 md:w-20 md:h-20" />
                    </div>
                ))}
            </div>

            <h1 className="text-black text-2xl md:text-4xl mt-6 md:mt-10">Shop By Brand</h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-5 w-full max-w-7xl">
                {brands.map((brand) => (
                    <div
                        className="flex flex-col items-center justify-center gap-2 md:gap-5 border-solid border p-3 md:p-8 border-black rounded-md"
                        key={brand}
                    >
                        <h2 className="text-lg md:text-2xl font-bold text-center">{brand}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Section;