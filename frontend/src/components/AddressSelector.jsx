import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export default function AddressSelector({ onSelect }) {

  const [addresses, setAddresses] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axiosInstance.get("/orders/")
      .then(res => {
        setAddresses(res.data.data.addresses);

        const def = res.data.data.addresses.find(a => a.isDefault);
        setSelected(def);
        onSelect(def);
      });
  }, []);

  const selectAddress = (addr) => {
    setSelected(addr);
    onSelect(addr);
  };

  return (
    <div className="space-y-3">

      {addresses.map(addr => (
        <div
          key={addr._id}
          onClick={() => selectAddress(addr)}
          className={`
            border p-3 rounded-xl cursor-pointer
            ${selected?._id === addr._id ? "border-black" : ""}
          `}
        >

          <p className="font-semibold">
            {addr.name} • {addr.phone}
          </p>

          <p className="text-sm text-gray-500">
            {addr.street}, {addr.city}, {addr.state}
          </p>

        </div>
      ))}

    </div>
  );
}