import { useState } from "react"

function Newsletter() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
      //send the email to your backend
      setTimeout(() => {
        setSubscribed(false)
      }, 3000)
    }
  }

  return (
    <div className="w-full bg-gray-900 text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
          <div className="text-center md:text-left md:max-w-md">
            <h2 className="text-2xl md:text-3xl font-bold">Subscribe to Our Newsletter</h2>
            <p className="mt-3 text-gray-300">
              Stay updated with the latest trends, new arrivals, and exclusive offers.
            </p>
          </div>
          <div className="w-full md:w-auto">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="px-4 py-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 text-white w-full sm:min-w-[300px]"
                required
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300"
              >
                Subscribe
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M22 2L11 13" />
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
              </button>
            </form>
            {subscribed && <p className="mt-2 text-green-400 text-sm">Thank you for subscribing!</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Newsletter

