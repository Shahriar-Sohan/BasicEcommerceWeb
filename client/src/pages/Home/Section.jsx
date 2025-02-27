import accessories from '../../assets/accessories.png';
import men from '../../assets/men.png';
import women from '../../assets/women.png';
import kids from '../../assets/kid.png';
import shoe from '../../assets/shoe.png';


const categories = [
    { title: 'Men', image: men, altText: 'Men' },
    { title: 'Women', image: women, altText: 'Women' },
    { title: 'Kids', image: kids, altText: 'Kids' },
    { title: 'Accessories', image: accessories, altText: 'Accessories' },
    { title: 'Footwear', image: shoe, altText: 'Footwear' },
]


function Section() {
    return (
        <div className="flex flex-col justify-center items-center w-full my-10 gap-6">

            <h1 className="text-black text-4xl " >Shop By Catagory</h1>

            <div className='flex flex-row gap-5' >

                {categories.map(catagory => (
                    <div className='flex flex-col items-center justify-center
                     gap-5 border-solid border-2 p-8 border-black ' 
                     key={catagory.title} >

                        <h2 className='text-2xl font-bold'>{catagory.title}</h2>
                        <img src={catagory.image} alt={catagory.altText} />

                    </div>
                ))}

            </div>

        </div>
    )
}

export default Section