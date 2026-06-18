import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

import {
  ArrowLeft,
  Package,
  CreditCard,
  CalendarDays,
  Truck,
  CircleCheckBig,
  Clock3,
  Receipt,
} from "lucide-react";

export default function OrderDetail() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatPrice = (price = 0) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const totalItems = useMemo(
    () =>
      order?.items?.reduce(
        (acc, item) => acc + item.quantity,
        0
      ) || 0,
    [order]
  );

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axiosInstance.get(
          `/orders/order/${id}`
        );

        setOrder(res.data.data);
      } catch (error) {
        console.error(error);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-700",
    Processing: "bg-blue-100 text-blue-700",
    Shipped: "bg-indigo-100 text-indigo-700",
    Delivered: "bg-emerald-100 text-emerald-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  const statusColor =
    statusStyles[order?.orderStatus] ||
    "bg-gray-100 text-gray-600";

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center text-gray-500">
        Loading Order...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="h-[60vh] flex items-center justify-center text-red-500">
        Order not found
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">

          <div>
            <Link
              to="/my-orders"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
            >
              <ArrowLeft size={18} />
              Back to Orders
            </Link>

            <h1 className="text-3xl font-bold mt-3">
              Order #
              {order.orderId?.slice(-8)?.toUpperCase()}
            </h1>

            <p className="text-gray-500 mt-2">
              Placed on{" "}
              {new Date(order.createdAt).toLocaleDateString(
                "en-IN",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )}
            </p>
          </div>

          <div
            className={`px-5 py-2 rounded-full font-medium w-fit ${statusColor}`}
          >
            {order.orderStatus}
          </div>

        </div>

      </div>

      {/* ORDER TIMELINE */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">

        <h2 className="font-semibold text-lg mb-8">
          Order Progress
        </h2>

        <div className="flex items-center justify-between">

          <TimelineStep
            title="Placed"
            icon={<Clock3 size={18} />}
            active
          />

          <div className="flex-1 h-1 bg-emerald-500 mx-2 rounded-full" />

          <TimelineStep
            title="Processing"
            icon={<Package size={18} />}
            active={[
              "Processing",
              "Shipped",
              "Delivered",
            ].includes(order.orderStatus)}
          />

          <div
            className={`flex-1 h-1 mx-2 rounded-full ${
              ["Shipped", "Delivered"].includes(
                order.orderStatus
              )
                ? "bg-emerald-500"
                : "bg-gray-200"
            }`}
          />

          <TimelineStep
            title="Shipped"
            icon={<Truck size={18} />}
            active={[
              "Shipped",
              "Delivered",
            ].includes(order.orderStatus)}
          />

          <div
            className={`flex-1 h-1 mx-2 rounded-full ${
              order.orderStatus === "Delivered"
                ? "bg-emerald-500"
                : "bg-gray-200"
            }`}
          />

          <TimelineStep
            title="Delivered"
            icon={<CircleCheckBig size={18} />}
            active={order.orderStatus === "Delivered"}
          />
        </div>

      </div>

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* ITEMS */}
        <div className="lg:col-span-2">

          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">

            <div className="flex justify-between items-center mb-6">

              <h2 className="font-semibold text-lg">
                Order Items
              </h2>

              <span className="text-sm text-gray-500">
                {totalItems} Item(s)
              </span>

            </div>

            <div className="space-y-4">

              {order.items?.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 p-4 rounded-2xl border border-gray-100 hover:shadow-md transition-all"
                >

                  <img
                    src={item.product?.image?.[0]}
                    alt={item.product?.name}
                    className="w-24 h-24 object-cover rounded-2xl bg-gray-100"
                  />

                  <div className="flex-1">

                    <h3 className="font-semibold text-lg">
                      {item.product?.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                      {item.product?.description}
                    </p>

                    <div className="flex items-center gap-3 mt-4">

                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                        Qty {item.quantity}
                      </span>

                      <span className="font-semibold text-emerald-600">
                        {formatPrice(item.price)}
                      </span>

                    </div>

                  </div>

                  <div className="font-bold text-lg whitespace-nowrap">
                    {formatPrice(
                      item.price * item.quantity
                    )}
                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* ORDER INFO */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">

            <h2 className="font-semibold text-lg mb-5">
              Order Information
            </h2>

            <div className="space-y-4">

              <Info
                icon={<Package size={18} />}
                label="Order Status"
                value={order.orderStatus}
              />

              <Info
                icon={<CreditCard size={18} />}
                label="Payment Method"
                value={order.paymentMethod}
              />

              <Info
                icon={<Receipt size={18} />}
                label="Payment Status"
                value={order.paymentStatus}
              />

              <Info
                icon={<Package size={18} />}
                label="Total Items"
                value={totalItems}
              />

              <Info
                icon={<CalendarDays size={18} />}
                label="Order Date"
                value={new Date(
                  order.createdAt
                ).toLocaleDateString("en-IN")}
              />

              <Info
                icon={<Truck size={18} />}
                label="Expected Delivery"
                value={
                  order.expectedDelivery
                    ? new Date(
                        order.expectedDelivery
                      ).toLocaleDateString("en-IN")
                    : "N/A"
                }
              />

            </div>

          </div>

          {/* PAYMENT SUMMARY */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm sticky top-5">

            <h2 className="font-semibold text-lg mb-5">
              Payment Summary
            </h2>

            <SummaryRow
              label="Subtotal"
              value={formatPrice(order.totalPrice)}
            />

            <SummaryRow
              label="Platform Fee"
              value={formatPrice(order.platformCharge)}
            />

            <SummaryRow
              label="Delivery Charge"
              value={formatPrice(order.deliveryCharge)}
            />

            <div className="border-t my-4" />

            <div className="flex justify-between text-xl font-bold text-emerald-600">

              <span>Total</span>

              <span>
                {formatPrice(order.finalAmount)}
              </span>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

function TimelineStep({ title, icon, active }) {
  return (
    <div className="flex flex-col items-center">

      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center ${
          active
            ? "bg-emerald-500 text-white"
            : "bg-gray-100 text-gray-400"
        }`}
      >
        {icon}
      </div>

      <span className="text-sm mt-2 font-medium">
        {title}
      </span>

    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="flex justify-between items-center">

      <div className="flex items-center gap-3 text-gray-600">
        {icon}
        <span>{label}</span>
      </div>

      <span className="font-medium text-right">
        {value}
      </span>

    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between py-2">

      <span className="text-gray-600">
        {label}
      </span>

      <span className="font-medium">
        {value}
      </span>

    </div>
  );
}