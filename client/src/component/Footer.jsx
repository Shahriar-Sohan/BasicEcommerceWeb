import { Link } from "react-router-dom"
import { useContext } from "react"
import { OverlayContext } from "@/component/OverlayContext"

function Footer() {
  const currentYear = new Date().getFullYear()
  const { filterSidebar } = useContext(OverlayContext)

  return (
    <footer className={`w-full bg-black text-white pt-12 pb-6 relative z-20 
                       ${filterSidebar ? 'md:pl-[16.666667%]' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">RivalRay</h3>
            <p className="text-gray-400 mb-4">
              Your one-stop destination for all your fashion needs. Quality products at affordable prices.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9V12h2.54V9.59c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.44H15.4c-1.25 0-1.64.78-1.64 1.57V12h2.8l-.45 2.89h-2.35v6.99C18.34 21.12 22 16.99 22 12z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12.004 2.003c-5.523 0-10 4.477-10 10 0 4.418 2.866 8.164 6.875 9.485.5.093.682-.217.682-.482 0-.237-.008-.868-.013-1.704-2.798.608-3.392-1.351-3.392-1.351-.456-1.158-1.113-1.465-1.113-1.465-.911-.623.069-.61.069-.61 1.008.071 1.537 1.034 1.537 1.034.895 1.536 2.35 1.09 2.92.836.092-.648.351-1.09.637-1.34-2.22-.254-4.555-1.11-4.555-4.938 0-1.09.39-1.984 1.029-2.684-.103-.254-.446-1.283.098-2.676 0 0 .84-.269 2.75 1.026A9.573 9.573 0 0112 4.837c.845.004 1.692.114 2.487.334 1.91-1.295 2.748-1.026 2.748-1.026.546 1.393.203 2.422.1 2.676.64.7 1.029 1.594 1.029 2.684 0 3.84-2.34 4.677-4.56 4.93.36.308.68.917.68 1.847 0 1.333-.012 2.41-.012 2.743 0 .267.182.577.688.48C21.134 20.167 24 16.421 24 12.003c0-5.523-4.477-10-10-10z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M23.77 4.65c-.88.39-1.83.65-2.83.77a4.93 4.93 0 002.16-2.72c-.95.56-2 1.01-3.12 1.24A4.92 4.92 0 0016.41 4c-2.72 0-4.93 2.21-4.93 4.93 0 .39.04.77.11 1.14-4.1-.2-7.74-2.17-10.19-5.15-.42.72-.66 1.55-.66 2.43 0 1.68.86 3.16 2.16 4.03a4.91 4.91 0 01-2.23-.62v.06c0 2.35 1.67 4.31 3.88 4.76-.41.11-.84.17-1.28.17-.31 0-.62-.03-.92-.09.62 1.93 2.42 3.34 4.56 3.38a9.87 9.87 0 01-6.1 2.1c-.4 0-.79-.02-1.18-.07a13.91 13.91 0 007.56 2.21c9.07 0 14.03-7.51 14.03-14 0-.21 0-.42-.02-.62A10.02 10.02 0 0024 4.59a9.91 9.91 0 01-2.29.63 4.93 4.93 0 002.16-2.72z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M21.6 3.6a9.03 9.03 0 01-2.6.7 4.5 4.5 0 001.98-2.48 9.03 9.03 0 01-2.83 1.08A4.48 4.48 0 0016.65 2c-2.49 0-4.5 2.01-4.5 4.5 0 .35.04.69.1 1.02A12.74 12.74 0 013 3.54a4.48 4.48 0 001.39 6.01c-.61-.02-1.2-.19-1.71-.5v.05c0 2.16 1.54 3.97 3.58 4.38a4.5 4.5 0 01-2.02.08c.57 1.78 2.23 3.08 4.19 3.12A9.03 9.03 0 012 18.39a12.77 12.77 0 006.91 2.03c8.28 0 12.81-6.86 12.81-12.81 0-.2 0-.39-.01-.58A9.18 9.18 0 0021.6 3.6z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Men
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Women
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Kids
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors duration-300">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Customer Service
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Find a Store
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-600 shrink-0 mt-1">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9s-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span className="text-gray-400">176 Top G Street, Gotham City, SC 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-600 shrink-0">
                  <path d="M21 8h-6.586l3.293-3.293-1.414-1.414L12 8l5.293 5.293 1.414-1.414L14.414 8H21v12H3V8h18z"/>
                </svg>
                <span className="text-gray-400">(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-600 shrink-0">
                  <path d="M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H3V6h18v12z"/>
                </svg>
                <span className="text-gray-400">support@rivalraystore.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">&copy; {currentYear} RivalRay Store. All rights reserved.</p>
            <div className="flex gap-4 text-sm">
              <Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Shipping Info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer