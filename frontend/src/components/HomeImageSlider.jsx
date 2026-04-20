import React, { useEffect, useState } from "react"

const slides = [
  {
    img: "https://picsum.photos/1200/500?1",
    title: "Big Saving Days",
    subtitle: "Up to 70% OFF on groceries"
  },
  {
    img: "https://picsum.photos/1200/500?2",
    title: "Fresh Fruits & Vegetables",
    subtitle: "Farm fresh delivered daily"
  },
  {
    img: "https://picsum.photos/1200/500?3",
    title: "Home Essentials",
    subtitle: "Best deals on daily needs"
  },
  {
    img: "https://picsum.photos/1200/500?4",
    title: "Electronics Sale",
    subtitle: "Smart gadgets at lowest price"
  }
]

export default function HomeImageSlider() {
  const [current, setCurrent] = useState(0)

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex justify-center items-center bg-indigo-100 my-2 md:mx-30">
      <div className="w-full relative overflow-hidden rounded-lg">

      {/* Slider Wrapper */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`
        }}
      >

        {slides.map((item, index) => (
          <div
            key={index}
            className="min-w-full h-64 md:h-96 relative"
          >
            {/* Image */}
            <img
              src={item.img}
              alt="slide"
              className="w-full h-full object-cover"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="absolute bottom-10 left-6 text-white max-w-md">
              <h2 className="text-2xl md:text-4xl font-bold drop-shadow">
                {item.title}
              </h2>
              <p className="text-sm md:text-lg mt-2 text-gray-200">
                {item.subtitle}
              </p>

              <button className="mt-4 px-5 py-2 bg-green-500 hover:bg-green-600 transition rounded-md text-sm font-medium">
                Shop Now
              </button>
            </div>
          </div>
        ))}

      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-3 w-full flex justify-center gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              i === current ? "bg-white w-4" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
    </div>
  )
}