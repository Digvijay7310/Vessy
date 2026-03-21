import { useState } from "react";

function QuantityButton({ onChange }) {
  const [count, setCount] = useState(0);

  const increase = () => {
    const newValue = count + 1;
    setCount(newValue);
    onChange && onChange(newValue);
  };

  const decrease = () => {
    if (count === 0) return;
    const newValue = count - 1;
    setCount(newValue);
    onChange && onChange(newValue);
  };

  return (
    <div className="flex items-center justify-center">
      {count === 0 ? (
        <button
          onClick={increase}
          className="w-full bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white py-0.5 rounded"
        >
          Add to Cart
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <button onClick={decrease} className="text-lg font-bold bg-red-500 text-white px-2 hover:cursor-pointer rounded">-</button>
          <span className="">{count}</span>
          <button onClick={increase} className="text-lg font-bold bg-red-500 text-white px-2 hover:cursor-pointer rounded">+</button>
        </div>
      )}
    </div>
  );
}

export default QuantityButton;