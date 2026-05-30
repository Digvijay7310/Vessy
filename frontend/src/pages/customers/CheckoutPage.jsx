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

  // ======================
  // LOAD DATA
  // ======================
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
  // ADD ADDRESS (FIXED)
  // ======================
  const addAddress = async () => {
    try {
      setSavingAddress(true);

      const res = await axiosInstance.post(
        "/orders/addresses",
        newAddress
      );

      const updated = res.data?.data;

      if (!Array.isArray(updated)) {
        alert("Address response error");
        return;
      }

      setAddresses(updated);

      const last = updated[updated.length - 1];
      setSelectedAddress(last);

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
      alert(err.response?.data?.message || "Error adding address");
    } finally {
      setSavingAddress(false);
    }
  };

  // ======================
  // PLACE ORDER
  // ======================
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
      alert(err.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // LOADING
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
            Order Placed Successfully
          </h2>

          <p className="text-gray-500 mt-2">
            Delivery by{" "}
            {new Date(success.expectedDelivery).toDateString()}
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

      {/* LEFT */}
      <div className="lg:col-span-2 space-y-4">

        <h1 className="text-2xl font-bold">Checkout</h1>

        {/* ITEMS */}
        <div className="bg-white border rounded-xl p-4 space-y-3">
          {data.items.map((item) => (
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

        {/* ADDRESS */}
        <div className="bg-white border rounded-xl p-4">
          <h2 className="font-semibold mb-3">
            Delivery Address
          </h2>

          {addresses.map((addr) => (
            <div
              key={addr._id}
              onClick={() => setSelectedAddress(addr)}
              className={`p-3 border rounded cursor-pointer mb-2 ${
                selectedAddress?._id === addr._id
                  ? "border-black bg-gray-50"
                  : ""
              }`}
            >
              <p className="font-semibold">
                {addr.name} ({addr.phone})
              </p>
              <p className="text-sm text-gray-500">
                {addr.street}, {addr.city}, {addr.state} -{" "}
                {addr.pincode}
              </p>
            </div>
          ))}

          <button
            onClick={() => setShowForm(true)}
            className="text-blue-600 text-sm mt-2"
          >
            + Add new address
          </button>
        </div>
      </div>

      {/* RIGHT */}
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

        <button
          onClick={placeOrder}
          disabled={loading}
          className="w-full mt-4 bg-black text-white py-2 rounded-lg"
        >
          {loading ? "Placing..." : "Place Order"}
        </button>
      </div>

      {/* ======================
          ADDRESS MODAL
      ====================== */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-5 rounded-xl w-[90%] max-w-md space-y-2">

            <h2 className="text-lg font-bold">
              Add Address
            </h2>

            {["name", "phone", "street", "city", "state", "pincode"].map(
              (field) => (
                <input
                  key={field}
                  placeholder={field}
                  className="border p-2 w-full rounded"
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

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => setShowForm(false)}
                className="w-1/2 border py-2"
              >
                Cancel
              </button>

              <button
                onClick={addAddress}
                disabled={savingAddress}
                className="w-1/2 bg-black text-white py-2"
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