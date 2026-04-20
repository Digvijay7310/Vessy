import React from 'react'
import Footer from '../components/Footer'
import CategoryWithSubCategory from '../components/CategoryWithSubCategory'
import HomeImageSlider from '../components/HomeImageSlider'

export default function Home() {
  return (
    <div className='flex flex-col gap-2'>
    <HomeImageSlider />
    <CategoryWithSubCategory />
    </div>
  )
}
