import React, { useEffect, useState } from 'react'

function ImageSlider() {
    const images = [
        "https://levi.in/cdn/shop/files/Easy_in_levis_DUAL_-01_1.jpg?v=1760010323&width=1100",
        "https://levi.in/cdn/shop/files/NA_desktop.jpg?v=1752664621&width=1100"
    ]

    const [index, setIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, [1500])

        return () => clearInterval(interval)
    }, [images.length])
  return (
    <div className='w-full h-[350px] overflow-hidden border'>
        <img src={images[index]} alt="slider"
        className='w-full h-full object-contain transition-all duration-300'
        />
    </div>
  )
}

export default ImageSlider