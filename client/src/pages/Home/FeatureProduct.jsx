import diddy from '../../assets/mockups/Diddy.jpg'
import drake from '../../assets/mockups/drake.webp'
import kendrickLamar from '../../assets/mockups/kendrickLamar.jpg'
import randm from '../../assets/mockups/randm.webp'

const cards = [
    {
        id: 1,
        image: diddy,
        title: 'Diddy T-Shirt',
        gender: 'Unisex',
        brand: 'Sean John',
        price: '$49.99'
    },
    {
        id: 2,
        image: drake,
        title: 'Drake Hoodie',
        gender: 'Male',
        brand: 'OVO',
        price: '$79.99'
    },
    {
        id: 3,
        image: kendrickLamar,
        title: 'Kendrick Lamar Vinyl',
        gender: 'Unisex',
        brand: 'Top Dawg',
        price: '$29.99'
    },
    {
        id: 4,
        image: randm,
        title: 'R&M Sneakers',
        gender: 'Female',
        brand: 'Rick & Morty',
        price: '$129.99'
    },
]

function Feature(){
    return(
        <div className="flex flex-col justify-center items-center w-full my-10 gap-6">
            <h1 className="text-black text-4xl">Featured Products</h1>
            <div className="flex gap-6">
                {cards.map(card => (
                    <div key={card.id} className="border p-4 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 w-60">
                        <img src={card.image} alt={card.title} className="w-full h-48 object-cover rounded-md" />
                        <h3 className="text-xl font-semibold mt-4">{card.title}</h3>
                        <p className="text-gray-500">{card.gender}</p>
                        <p className="font-medium text-lg">{card.price}</p>
                        <p className="text-gray-700">{card.brand}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Feature