import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

export default function CheckoutPage() {

    const [checkoutData, setCheckoutData] = useState(null);

    const [paymentMethod, setPaymentMethod] =
        useState("COD");

    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState(null);

    useEffect(() => {

        fetchCheckout();

    }, []);

    const fetchCheckout = async () => {

        try {

            const res =
                await axiosInstance.get(
                    "/orders/preview-checkout"
                );

            setCheckoutData(res.data.data);

        } catch (err) {

            console.log(err);

        }

    };

    const formatPrice = (price) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }).format(price);

    const handlePlaceOrder = async () => {

        if (paymentMethod !== "COD") {

            return alert(
                "Please select Cash on Delivery for now"
            );
        }

        try {

            setLoading(true);

            const res =
                await axiosInstance.post(
                    "/orders/checkout",
                    {
                        paymentMethod
                    }
                );

            setSuccess(res.data.data);

        } catch (err) {

            alert(
                err.response?.data?.message
            );

        } finally {

            setLoading(false);

        }
    };

    if (!checkoutData) {

        return <p>Loading...</p>;
    }

    if (success) {

        return (

            <div className="max-w-3xl mx-auto p-6">

                <h2 className="text-3xl font-bold text-green-600 mb-4">
                    Order Placed Successfully
                </h2>

                <p>
                    Payment Status:
                    <b> {success.paymentStatus}</b>
                </p>

                <p>
                    Delivery By:
                    <b>
                        {" "}
                        {
                            new Date(
                                success.expectedDelivery
                            ).toDateString()
                        }
                    </b>
                </p>

            </div>
        );
    }

    return (

        <div className="max-w-5xl mx-auto p-6">

            <h2 className="text-3xl font-bold mb-6">
                Checkout
            </h2>

            {/* ITEMS */}

            <div className="flex flex-col gap-4">

                {
                    checkoutData.items.map(item => (

                        <div
                            key={item.product._id}
                            className="border rounded-xl p-4 flex justify-between items-center"
                        >

                            <div className="flex gap-4 items-center">

                                <img
                                    src={item.product.image?.[0]}
                                    alt={item.product.name}
                                    className="w-24 h-24 object-contain bg-gray-100 rounded-lg"
                                />

                                <div>

                                    <p className="font-semibold">
                                        {item.product.name}
                                    </p>

                                    <p>
                                        Qty:
                                        {" "}
                                        {item.quantity}
                                    </p>

                                    <p className="text-green-600">
                                        {
                                            formatPrice(
                                                item.product.price
                                            )
                                        }
                                    </p>

                                </div>

                            </div>

                            <p className="font-bold">

                                {
                                    formatPrice(
                                        item.product.price *
                                        item.quantity
                                    )
                                }

                            </p>

                        </div>
                    ))
                }

            </div>

            {/* PAYMENT */}

            <div className="mt-8 border rounded-xl p-6">

                <h3 className="font-bold text-lg mb-4">
                    Payment Method
                </h3>

                <div className="flex flex-col gap-3">

                    <label>
                        <input
                            type="radio"
                            checked={
                                paymentMethod === "COD"
                            }
                            onChange={() =>
                                setPaymentMethod("COD")
                            }
                        />

                        {" "}Cash on Delivery
                    </label>

                    <label>
                        <input
                            type="radio"
                            checked={
                                paymentMethod === "UPI"
                            }
                            onChange={() =>
                                setPaymentMethod("UPI")
                            }
                        />

                        {" "}UPI
                    </label>

                    <label>
                        <input
                            type="radio"
                            checked={
                                paymentMethod === "CARD"
                            }
                            onChange={() =>
                                setPaymentMethod("CARD")
                            }
                        />

                        {" "}Debit/Credit Card
                    </label>

                </div>

            </div>

            {/* PRICE DETAILS */}

            <div className="mt-8 border rounded-xl p-6 bg-gray-50">

                <div className="flex justify-between mb-2">
                    <span>Subtotal</span>

                    <span>
                        {
                            formatPrice(
                                checkoutData.totalPrice
                            )
                        }
                    </span>
                </div>

                <div className="flex justify-between mb-2">
                    <span>Platform Fee</span>

                    <span>
                        {
                            formatPrice(
                                checkoutData.platformCharge
                            )
                        }
                    </span>
                </div>

                <div className="flex justify-between mb-2">
                    <span>Delivery Fee</span>

                    <span>
                        {
                            formatPrice(
                                checkoutData.deliveryCharge
                            )
                        }
                    </span>
                </div>

                <div className="flex justify-between font-bold text-xl mt-4">

                    <span>Total</span>

                    <span className="text-green-600">
                        {
                            formatPrice(
                                checkoutData.finalAmount
                            )
                        }
                    </span>

                </div>

                <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-3 rounded-xl mt-6"
                >

                    {
                        loading
                            ? "Placing Order..."
                            : "Place Order"
                    }

                </button>

            </div>

        </div>
    );
}