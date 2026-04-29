import React from 'react'
import Footer from '../layout/Footer'
import CategoryWithSubCategory from '../components/CategoryWithSubCategory'
import HomeImageSlider from '../components/HomeImageSlider'
import SelectMenu from '../assets/SelectMenu'

export default function Home() {
  return (
    <div className='flex flex-col gap-2'>
    <SelectMenu />
    {/* <HomeImageSlider /> */}
    <CategoryWithSubCategory />
    </div>
  )
}
