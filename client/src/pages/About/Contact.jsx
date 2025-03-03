


function Contact() {
    return (
        <section className="bg-gray-900 text-white py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-serif font-light mb-6">Connect With Us</h2>
                        <p className="text-gray-300 mb-8 leading-relaxed">
                            We'd love to hear from you. Whether you have questions, feedback, or just want to say hello, our team is here for you.
                        </p>
                        <div className="space-y-4">
                            <p className="flex items-center text-gray-300">
                                <span className="mr-3">Email:</span>
                                <a href="mailto:hello@rivalray.com" className="text-white hover:text-gray-200 transition-colors duration-300">hello@rivalray.com</a>
                            </p>
                            <p className="flex items-center text-gray-300">
                                <span className="mr-3">Phone:</span>
                                <span className="text-white">(555) 123-4567</span>
                            </p>
                        </div>
                    </div>
                    <div className="bg-gray-800 p-8 rounded">
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                                <input type="text" id="name" className="w-full bg-gray-700 border-0 rounded px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-white" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                                <input type="email" id="email" className="w-full bg-gray-700 border-0 rounded px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-white" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                                <textarea id="message" rows="4" className="w-full bg-gray-700 border-0 rounded px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-white"></textarea>
                            </div>
                            <button type="button" className="bg-white text-gray-900 px-6 py-2 rounded font-medium hover:bg-gray-100 transition-colors duration-300">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Contact