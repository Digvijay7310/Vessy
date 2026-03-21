import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import BiscutesDrinksPackaged from "./components/BiscutesDrinksPackaged";
import FruitesAndVegetables from "./components/FruitesAndVegetables";
import DairyAndBakery from "./components/DairyAndBakery";

function App() {
  const products = new Array(12).fill()
  return (
    <>
    <Header />
    <section className="max-w-7xl mx-auto md:p-4">
      <Hero />
      <section>
        <div className="m-auto px-3 py-3 text-gray-500 font-bold"><hr /><hr /></div>
        <BiscutesDrinksPackaged />
      </section>
      <section>
        <div className="m-auto px-3 py-3 text-gray-500 font-bold"><hr /><hr /></div>
        <FruitesAndVegetables />
      </section>

      <section>
        <div className="m-auto px-3 py-3 text-gray-500 font-bold"><hr /><hr /></div>
        <DairyAndBakery />
      </section>
      <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
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