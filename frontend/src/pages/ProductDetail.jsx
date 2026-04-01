import React, { useRef, useState } from 'react'

function ProductDetail() {
    const desc = useRef()

    const [description, setDescription] = useState(false)

      return (
    <div className='bg-fuchsia-50 p-1 flex flex-col items-center gap-4'>
        <section className="">
           <div className="flex flex-col gap-4">
            <img src="via.placeholder.com" alt="Products"
            className='object-contain h-80 md:h-100 rounded border bg-sky-400'
            />
            <h2>This is the product that will like you when you take this you feel oo la la and this is very interesting for tasting and when your guest arrives your home sever this one. Special garma-garam naan kathai. </h2>

            <p id="desc" className="mt-2 line-clamp-2" onClick={showDescription()}
            ref={desc}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum a aliquid quis sunt rerum ipsum cupiditate enim, dolores fugit fugiat! Quis minus consequatur, sit quam in voluptate deserunt quia cumque.
                Accusamus alias facilis similique adipisci aliquam illo, pariatur dignissimos esse non voluptates in tempora delectus natus velit laboriosam consectetur dolores? At labore neque est laboriosam ut, enim esse provident quisquam.
            </p>
           </div>
        </section>
        <section className="">This is Detail and others images section</section>
    </div>
  )
}

export default ProductDetail