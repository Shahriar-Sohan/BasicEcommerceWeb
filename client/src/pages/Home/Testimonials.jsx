import { useEffect, useState } from "react"

function Testimonials() {
    const [testimonials, setTestimonials] = useState([])

    useEffect(()=>{
        fetch('/testimonials.json') //mock api from public folder
            .then(response=>response.json())
            .then(data=>{
                setTestimonials(data)
            })
            .catch(error => console.error('Error fetching product data:',error));
    },[])

    return (
      <div className="flex flex-col justify-center items-center w-full my-12 md:my-16 px-4 md:px-6 gap-8 md:gap-12">
        <div className="text-center">
          <h2 className="text-sm font-medium tracking-wider text-red-600 uppercase">What People Say</h2>
          <h1 className="text-black text-3xl md:text-4xl font-bold mt-2">Customer Reviews</h1>
          <div className="w-20 h-1 bg-black mx-auto mt-4"></div>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-7xl">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={i < testimonial.rating ? "#FFC107" : "none"}
                    stroke={i < testimonial.rating ? "#FFC107" : "#CBD5E0"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    )
}
  
export default Testimonials