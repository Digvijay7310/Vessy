import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { CheckCircle } from "lucide-react";
import AddressSelector from "../../components/AddressSelector";

export default function CheckoutPage() {

  const [data, setData] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    axiosInstance.get("/orders/preview-checkout")
      .then(res => setData(res.data.data))
      .catch(console.log);
  }, []);

  const placeOrder = async () => {
    if (!address) return alert("Select address first");

    try {
      setLoading(true);

      const res = await axiosInstance.post("/orders/checkout", {
        paymentMethod: "COD",
        addressId: address._id
      });

      setSuccess(res.data.data);

    } catch (err) {
      alert(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const format = (n) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);

  if (!data) {
    return (
      <div className="h-[70vh] flex items-center justify-center text-gray-500">
        Loading checkout...
      </div>
    );
  }

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

        {/* ADDRESS (IMPORTANT FIX) */}
        <div className="bg-white border rounded-xl p-4">
          <h2 className="font-semibold mb-2">
            Delivery Address
          </h2>

          <AddressSelector onSelect={setAddress} />

          {address && (
            <p className="text-xs text-gray-500 mt-2">
              Delivering to: {address.name}, {address.city}
            </p>
          )}
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="bg-white border rounded-xl p-4 h-fit sticky top-20">

        <h2 className="font-bold mb-3">
          Price Details
        </h2>

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
            {data.deliveryCharge === 0
              ? "FREE"
              : format(data.deliveryCharge)}
          </span>
        </div>

        <hr className="my-3" />

        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span className="text-green-600">
            {format(data.finalAmount)}
          </span>
        </div>

        {/* COD ONLY */}
        <div className="mt-4 bg-gray-50 p-3 rounded-lg text-sm">
          Cash on Delivery Only
        </div>

        {/* BUTTON */}
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