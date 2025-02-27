import diddy from '../../assets/mockups/Diddy.jpg'
import drake from '../../assets/mockups/drake.webp'
import kendrickLamar from '../../assets/mockups/kendrickLamar.jpg'
import randm from '../../assets/mockups/randm.webp'

const products = [
    {
        id: 1,
        title: "Diddy T-Shirt",
        price: 49.99,
        category: "Clothing",
        gender: "Unisex",
        brand: "Sean John",
        image: diddy,
    },
    {
        id: 2,
        title: "Drake Hoodie",
        price: 79.99,
        category: "Clothing",
        gender: "Male",
        brand: "OVO",
        image: drake,
    },
    {
        id: 3,
        title: "Kendrick Lamar Vinyl",
        price: 29.99,
        category: "Music",
        gender: "Unisex",
        brand: "Top Dawg",
        image: kendrickLamar,
    },
    {
        id: 4,
        title: "R&M Sneakers",
        price: 129.99,
        category: "Shoes",
        gender: "Female",
        brand: "Rick & Morty",
        image: randm,
    },
    {
        id: 5,
        title: "Running Shoes",
        price: 119.99,
        category: "Shoes",
        image: "/placeholder.svg?height=400&width=400",
    },
    {
        id: 6,
        title: "Wool Sweater",
        price: 89.99,
        category: "Clothing",
        image: "/placeholder.svg?height=400&width=400",
    },
    {
        id: 7,
        title: "Canvas Tote Bag",
        price: 39.99,
        category: "Accessories",
        image: "/placeholder.svg?height=400&width=400",
    },
    {
        id: 8,
        title: "Slim Fit Jeans",
        price: 79.99,
        category: "Clothing",
        image: "/placeholder.svg?height=400&width=400",
    },
];

export default function AllProducts() {
    return (
        <div className="ml-[16.67%] mt-15 flex-1 px-4 py-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="cursor-pointer group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md"
                    >
                        <div className="aspect-square overflow-hidden">
                            <img
                                src={product.image }
                                alt={product.title}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div className="p-4">
                            <p className="text-sm text-gray-500">{product.category}</p>
                            <h3 className="mt-1 text-lg font-medium text-gray-900">
                                {product.title}
                            </h3>
                            <p className="mt-2 text-xl font-semibold text-gray-900">
                                ${product.price.toFixed(2)}
                            </p>
                            <button className="mt-4 w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black/25">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
