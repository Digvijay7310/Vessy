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
  const [savingAddress, setSavingAddress] = useState(false);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cartRes, addrRes] = await Promise.all([
          axiosInstance.get("/orders/preview-checkout"),
          axiosInstance.get("/orders/addresses"),
        ]);

        setData(cartRes.data.data || null);

        const list = addrRes.data.data || [];
        setAddresses(list);

        const defaultAddr = list.find((a) => a.isDefault);
        if (defaultAddr) setSelectedAddress(defaultAddr);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const format = (n) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);

  const placeOrder = async () => {
    if (!selectedAddress) {
      setShowForm(true);
      return;
    }

    try {
      setLoading(true);

      const res = await axiosInstance.post("/orders/checkout", {
        paymentMethod: "COD",
      });

      setSuccess(res.data.data);
    } catch (err) {
      alert("Order failed");
    } finally {
      setLoading(false);
    }
  };

  if (!data) {
    return (
      <div className="h-[60vh] flex items-center justify-center text-gray-400 text-sm">
        Loading checkout...
      </div>
    );
  }

  if (success) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl border shadow-sm">
          <CheckCircle className="text-green-500 mx-auto" size={50} />
          <h2 className="text-xl font-semibold mt-3">
            Order Placed
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Delivery by {new Date(success.expectedDelivery).toDateString()}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 grid lg:grid-cols-3 gap-5">

      {/* LEFT */}
      <div className="lg:col-span-2 space-y-5">

        <h1 className="text-xl font-semibold text-gray-900">
          Checkout
        </h1>

        {/* ITEMS */}
        <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-3">

          {data.items.map((item) => (
            <div
              key={item.product._id}
              className="flex justify-between items-start"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {item.product.name}
                </p>
                <p className="text-xs text-gray-400">
                  Qty {item.quantity}
                </p>
              </div>

              <p className="text-sm font-semibold text-gray-900">
                {format(item.product.price * item.quantity)}
              </p>
            </div>
          ))}

        </div>

        {/* ADDRESS */}
        <div className="bg-white border border-gray-100 rounded-xl p-4">

          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold text-gray-900">
              Delivery Address
            </h2>

            <button
              onClick={() => setShowForm(true)}
              className="text-xs text-blue-600"
            >
              Add
            </button>
          </div>

          <div className="space-y-2">

            {addresses.map((addr) => (
              <div
                key={addr._id}
                onClick={() => setSelectedAddress(addr)}
                className={`p-3 rounded-lg border cursor-pointer transition text-sm
                  ${
                    selectedAddress?._id === addr._id
                      ? "border-gray-900 bg-gray-50"
                      : "border-gray-100 hover:bg-gray-50"
                  }`}
              >
                <p className="font-medium text-gray-900">
                  {addr.name} • {addr.phone}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {addr.city}, {addr.state} - {addr.pincode}
                </p>
              </div>
            ))}

          </div>

        </div>

      </div>

      {/* RIGHT */}
      <div className="bg-white border border-gray-100 rounded-xl p-4 h-fit sticky top-16">

        <h2 className="text-sm font-semibold mb-3">
          Price Summary
        </h2>

        <div className="space-y-2 text-xs text-gray-600">

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{format(data.totalPrice)}</span>
          </div>

          <div className="flex justify-between">
            <span>Platform Fee</span>
            <span>{format(data.platformCharge)}</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery</span>
            <span className="text-green-600">
              {data.deliveryCharge === 0
                ? "FREE"
                : format(data.deliveryCharge)}
            </span>
          </div>

        </div>

        <div className="border-t mt-3 pt-3 flex justify-between text-sm font-semibold">
          <span>Total</span>
          <span className="text-gray-900">
            {format(data.finalAmount)}
          </span>
        </div>

        <button
          onClick={placeOrder}
          disabled={loading}
          className="w-full mt-4 bg-gray-900 hover:bg-black text-white py-2 rounded-lg text-sm"
        >
          {loading ? "Placing..." : "Place Order"}
        </button>

      </div>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">

          <div className="bg-white p-5 rounded-xl w-full max-w-sm">

            <h2 className="text-sm font-semibold mb-3">
              Add Address
            </h2>

            <div className="space-y-2">
              {["name", "phone", "street", "city", "state", "pincode"].map(
                (field) => (
                  <input
                    key={field}
                    placeholder={field}
                    className="border border-gray-200 p-2 w-full rounded-md text-sm"
                    value={newAddress[field]}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        [field]: e.target.value,
                      })
                    }
                  />
                )
              )}
            </div>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => setShowForm(false)}
                className="w-1/2 border border-gray-200 py-2 text-sm rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={placeOrder}
                className="w-1/2 bg-gray-900 text-white py-2 text-sm rounded-md"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}