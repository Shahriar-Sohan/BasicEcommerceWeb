

function Hero() {
    return (
        < div className="relative" >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 opacity-70"></div>
            <div className="relative max-w-6xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-5xl font-light tracking-tight text-gray-900 mb-3">About RivalRay</h1>
                    <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed">
                        Crafting unique apparel for those who believe style is a form of self-expression.
                    </p>
                    <div className="mt-8">
                        <div className="inline-flex h-px w-32 bg-gray-300"></div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Hero