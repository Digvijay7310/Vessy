import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";

function App() {
  const products = new Array(12).fill()
  return (
    <>
    <Header />
    <section className="max-w-7xl mx-auto md:p-4">
      <Hero />
      <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-0.5">
        {products.map((_, id) => (
        <div id={id} className="">
          <ProductCard />
        </div>
      ))}
      </div>
    </section>
    </>
  )
}


export default App;