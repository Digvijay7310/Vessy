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
  const [savingAddress, setSavingAddress] = useState(false);

  // FETCH DATA
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

  // FORMAT PRICE
  const format = (n) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);

  // SAVE ADDRESS
  const saveAddress = async () => {
    try {
      setSavingAddress(true);

      const res = await axiosInstance.post(
        "/orders/addresses",
        newAddress
      );

      const saved = res.data.data;

      setAddresses((prev) => [...prev, saved]);
      setSelectedAddress(saved);
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
      console.log(err);
      alert("Failed to save address");
    } finally {
      setSavingAddress(false);
    }
  };

  // PLACE ORDER
  const placeOrder = async () => {
    if (!selectedAddress) {
      setShowForm(true);
      return;
    }

    try {
      setLoading(true);

      const res = await axiosInstance.post("/orders/checkout", {
        paymentMethod: "COD",
        addressId: selectedAddress._id,
      });

      setSuccess(res.data.data);
    } catch (err) {
      console.log(err);
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
      <div className="h-[70vh] flex items-center justify-center">
        <div className="text-center p-8 rounded-2xl border shadow-lg w-full max-w-md">
          <CheckCircle className="text-green-500 mx-auto" size={60} />
          <h2 className="text-2xl font-semibold mt-4">Order Placed</h2>
          <p className="text-gray-500 text-sm mt-2">
            Delivery by{" "}
            {new Date(success.expectedDelivery).toDateString()}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-6 bg-gray-50 min-h-screen">

      {/* LEFT */}
      <div className="lg:col-span-2 space-y-6">

        <h1 className="text-2xl font-bold">Checkout</h1>

        {/* ITEMS */}
        <div className="bg-white border rounded-2xl p-5 space-y-4 shadow-sm">
          {data.items.map((item) => (
            <div
              key={item.product._id}
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                <p className="text-sm font-medium">
                  {item.product.name}
                </p>
                <p className="text-xs text-gray-400">
                  Qty {item.quantity}
                </p>
              </div>

              <p className="text-sm font-semibold">
                {format(item.product.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        {/* ADDRESS */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold">
              Delivery Address
            </h2>

            <button
              onClick={() => setShowForm(true)}
              className="text-sm text-blue-600"
            >
              + Add New
            </button>
          </div>

          <div className="space-y-3">
            {addresses.map((addr) => (
              <div
                key={addr._id}
                onClick={() => setSelectedAddress(addr)}
                className={`p-4 rounded-xl border cursor-pointer ${
                  selectedAddress?._id === addr._id
                    ? "border-black bg-gray-50"
                    : "border-gray-200"
                }`}
              >
                <p className="font-medium">
                  {addr.name} • {addr.phone}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {addr.street}, {addr.city}, {addr.state} -{" "}
                  {addr.pincode}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="bg-white border rounded-2xl p-5 h-fit sticky top-20">

        <h2 className="font-semibold mb-4">Price Summary</h2>

        <div className="space-y-2 text-sm">
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

        <div className="border-t mt-4 pt-4 flex justify-between font-semibold">
          <span>Total</span>
          <span className="text-green-600">
            {format(data.finalAmount)}
          </span>
        </div>

        <button
          onClick={placeOrder}
          disabled={loading}
          className="w-full mt-5 bg-black text-white py-3 rounded-xl"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">

          <div className="bg-white p-6 rounded-2xl w-full max-w-md">

            <h2 className="text-lg font-semibold mb-4">
              Add Address
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {Object.keys(newAddress).map((field) => (
                <input
                  key={field}
                  placeholder={field}
                  value={newAddress[field]}
                  onChange={(e) =>
                    setNewAddress({
                      ...newAddress,
                      [field]: e.target.value,
                    })
                  }
                  className="border p-2 rounded-lg text-sm"
                />
              ))}
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setShowForm(false)}
                className="w-1/2 border py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={saveAddress}
                disabled={savingAddress}
                className="w-1/2 bg-black text-white py-2 rounded-lg"
              >
                {savingAddress ? "Saving..." : "Save"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}