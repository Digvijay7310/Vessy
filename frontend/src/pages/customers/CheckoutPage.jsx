import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { CheckCircle } from "lucide-react";

export default function CheckoutPage() {

  const [data, setData] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  // ======================
  // LOAD DATA
  // ======================
  useEffect(() => {

    axiosInstance.get("/orders/preview-checkout")
      .then(res => setData(res.data.data))
      .catch(console.log);

    axiosInstance.get("/orders/addresses")
      .then(res => {
        const list = res.data.data;

        setAddresses(list);

        const defaultAddr = list.find(a => a.isDefault);
        if (defaultAddr) setSelectedAddress(defaultAddr);
      })
      .catch(console.log);

  }, []);

  // ======================
  // ADD ADDRESS
  // ======================
  const addAddress = async () => {
    try {

      const res = await axiosInstance.post("/orders/addresses", newAddress);

      const updated = res.data.data;

      setAddresses(updated);

      setShowForm(false);
      setNewAddress({
        name: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
      });

    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  // ======================
  // PLACE ORDER
  // ======================
  const placeOrder = async () => {

    if (!selectedAddress) {
      return alert("Please select delivery address");
    }

    try {

      setLoading(true);

      const res = await axiosInstance.post("/orders/checkout", {
        paymentMethod: "COD"
      });

      setSuccess(res.data.data);

    } catch (err) {
      alert(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // FORMAT PRICE
  // ======================
  const format = (n) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);

  // ======================
  // LOADING STATE
  // ======================
  if (!data) {
    return (
      <div className="h-[70vh] flex items-center justify-center text-gray-500">
        Loading checkout...
      </div>
    );
  }

  // ======================
  // SUCCESS SCREEN
  // ======================
  if (success) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <div className="text-center bg-white border p-8 rounded-2xl shadow">
          <CheckCircle className="text-green-500 mx-auto" size={50} />

          <h2 className="text-2xl font-bold mt-4">
            Order Placed
          </h2>

          <p className="text-gray-500 mt-2">
            Delivery by {new Date(success.expectedDelivery).toDateString()}
          </p>
        </div>
      </div>
    );
  }

  // ======================
  // MAIN UI
  // ======================
  return (
    <div className="max-w-5xl mx-auto p-4 grid lg:grid-cols-3 gap-6">

      {/* LEFT SIDE */}
      <div className="lg:col-span-2 space-y-4">

        <h1 className="text-2xl font-bold">Checkout</h1>

        {/* ITEMS */}
        <div className="bg-white border rounded-xl p-4 space-y-3">

          {data.items.map(item => (
            <div
              key={item.product._id}
              className="flex justify-between border-b pb-2 last:border-b-0"
            >
              <div>
                <p className="font-semibold">
                  {item.product.name}
                </p>

                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>

              <p className="font-bold text-green-600">
                {format(item.product.price * item.quantity)}
              </p>
            </div>
          ))}

        </div>

        {/* ADDRESS SECTION */}
        <div className="bg-white border rounded-xl p-4">

          <h2 className="font-semibold mb-3">
            Delivery Address
          </h2>

          {/* ADDRESS LIST */}
          <div className="space-y-2">

            {addresses.map(addr => (
              <div
                key={addr._id}
                onClick={() => setSelectedAddress(addr)}
                className={`p-3 border rounded cursor-pointer ${
                  selectedAddress?._id === addr._id
                    ? "border-black bg-gray-50"
                    : ""
                }`}
              >
                <p className="font-semibold">
                  {addr.name} ({addr.phone})
                </p>
                <p className="text-sm text-gray-500">
                  {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
                </p>
              </div>
            ))}

          </div>

          {/* ADD NEW ADDRESS */}
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="mt-3 text-sm text-blue-600"
            >
              + Add new address
            </button>
          ) : (
            <div className="mt-4 space-y-2">

              <input
                placeholder="Name"
                className="border p-2 w-full"
                onChange={(e) =>
                  setNewAddress({ ...newAddress, name: e.target.value })
                }
              />

              <input
                placeholder="Phone"
                className="border p-2 w-full"
                onChange={(e) =>
                  setNewAddress({ ...newAddress, phone: e.target.value })
                }
              />

              <input
                placeholder="Street"
                className="border p-2 w-full"
                onChange={(e) =>
                  setNewAddress({ ...newAddress, street: e.target.value })
                }
              />

              <input
                placeholder="City"
                className="border p-2 w-full"
                onChange={(e) =>
                  setNewAddress({ ...newAddress, city: e.target.value })
                }
              />

              <input
                placeholder="State"
                className="border p-2 w-full"
                onChange={(e) =>
                  setNewAddress({ ...newAddress, state: e.target.value })
                }
              />

              <input
                placeholder="Pincode"
                className="border p-2 w-full"
                onChange={(e) =>
                  setNewAddress({ ...newAddress, pincode: e.target.value })
                }
              />

              <button
                onClick={addAddress}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Save Address
              </button>

            </div>
          )}

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="bg-white border rounded-xl p-4 h-fit sticky top-20">

        <h2 className="font-bold mb-3">Price Details</h2>

        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>{format(data.totalPrice)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Platform Fee</span>
          <span>{format(data.platformCharge)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Delivery</span>
          <span className="text-green-600">
            {data.deliveryCharge === 0 ? "FREE" : format(data.deliveryCharge)}
          </span>
        </div>

        <hr className="my-3" />

        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span className="text-green-600">
            {format(data.finalAmount)}
          </span>
        </div>

        <button
          onClick={placeOrder}
          disabled={loading}
          className="w-full mt-4 bg-black text-white py-2 rounded-lg"
        >
          {loading ? "Placing..." : "Place Order"}
        </button>

      </div>

    </div>
  );
}