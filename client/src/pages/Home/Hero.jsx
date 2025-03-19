import CarouselAnimation from '@/component/CarouselAnimation'
import { Link } from 'react-router-dom'





function Hero() {
    return (
        <div className="w-full h-auto mt-4 md:mt-6 lg:mt-15">
            <CarouselAnimation /> {/*for desktop only */}
            <div className="relative lg:hidden mt-10">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10" />
                <img src="https://www.mockupworld.co/wp-content/uploads/2018/06/free-womans-dress-lady-mockup-psd.jpg" alt="Featured product" className="w-full h-[60vh] object-cover" />

                <div className="absolute bottom-0 left-0 right-0 z-10 p-6 space-y-4">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Summer Collection</h1>
                    <p className="text-gray-200">Discover the latest trends for the season</p>
                    <Link to="/products">
                    <button className="w-full py-3 px-4 bg-black text-white font-medium rounded-md drop-shadow-2xl active:scale-95">
                            Shop Now
                        </button>
                    </Link>

                </div>
            </div>

        </div>
    )
}


export default Hero