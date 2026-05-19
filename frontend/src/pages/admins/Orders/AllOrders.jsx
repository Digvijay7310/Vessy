import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

import {
  Clock3,
  BadgeCheck,
  PackageCheck,
  Truck,
  Bike,
  RotateCcw,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

export default function AllOrders() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    confirmedOrders: 0,
    processingOrders: 0,
    shippedOrders: 0,
    outForDelivery: 0,
    deliveredOrders: 0,
    returnedOrders: 0,
  });

  const [loading, setLoading] = useState(false);

  const fetchAllOrders = async () => {

    try {

      setLoading(true);

      const res = await axiosInstance.get("/admins/all-orders");

      setData(res.data.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const stats = [
    {
      title: "Pending",
      value: data.pendingOrders,
      icon: Clock3,
      color: "bg-yellow-100 text-yellow-600",
      route: "Pending",
    },

    {
      title: "Confirmed",
      value: data.confirmedOrders,
      icon: BadgeCheck,
      color: "bg-blue-100 text-blue-600",
      route: "Confirmed",
    },

    {
      title: "Processing",
      value: data.processingOrders,
      icon: PackageCheck,
      color: "bg-violet-100 text-violet-600",
      route: "Processing",
    },

    {
      title: "Shipped",
      value: data.shippedOrders,
      icon: Truck,
      color: "bg-purple-100 text-purple-600",
      route: "Shipped",
    },

    {
      title: "Out for Delivery",
      value: data.outForDelivery,
      icon: Bike,
      color: "bg-orange-100 text-orange-600",
      route: "Out-for-Delivery",
    },

    {
      title: "Returned",
      value: data.returnedOrders,
      icon: RotateCcw,
      color: "bg-red-100 text-red-600",
      route: "Returned",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fb]">

      {/* HEADER */}

      <div className="
        flex
        flex-col
        lg:flex-row
        lg:items-center
        lg:justify-between
        gap-2
        mb-8
      ">

        <div>

          <h1 className="
            text-3xl
            sm:text-4xl
            font-bold
            text-gray-900
            tracking-tight
          ">
            Orders Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Track and manage all order activities
          </p>

        </div>

        {/* TOTAL CARD */}

        <div className="
          bg-white
          rounded-3xl
          px-6
          py-5
          shadow-sm
          border
          border-gray-100
          min-w-[220px]
        ">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total Orders
              </p>

              <h2 className="
                text-4xl
                font-bold
                text-gray-900
                mt-1
              ">
                {data.totalOrders}
              </h2>

            </div>

            <div className="
              w-14
              h-14
              rounded-2xl
              bg-black
              text-white
              flex
              items-center
              justify-center
            ">
              <ShoppingBag size={26} />
            </div>

          </div>

        </div>

      </div>

      {/* LOADING */}

      {loading ? (

        <div className="
          flex
          justify-center
          items-center
          h-[60vh]
        ">

          <div className="
            w-12
            h-10
            rounded-full
            border-4
            border-gray-200
            border-t-black
            animate-spin
          "/>

        </div>

      ) : (

        <>
          {/* STATS GRID */}

          <div className="
            grid
            grid-cols-3
            sm:grid-cols-4
            lg:grid-cols-5
            gap-4
          ">

            {stats.map((item, index) => {

              const Icon = item.icon;

              return (

                <div
                  key={index}
                  onClick={() =>
                    navigate(`/admin/orders/${item.route}`)
                  }
                  className="
                    bg-white
                    rounded-3xl
                    border
                    border-gray-100
                    shadow-sm
                    hover:shadow-xl
                    hover:-translate-y-1
                    transition-all
                    duration-300
                    cursor-pointer
                    p-2
                    group
                  "
                >

                  {/* TOP */}

                  <div className="
                    flex
                    items-start
                    justify-between
                  ">

                    <div className={`
                      w-12
                      h-12
                      rounded-2xl
                      flex
                      items-center
                      justify-center
                      ${item.color}
                    `}>

                      <Icon size={22} />

                    </div>

                    <ArrowRight
                      size={18}
                      className="
                        text-gray-300
                        group-hover:text-black
                        transition
                      "
                    />

                  </div>

                  {/* BODY */}

                  <div className="mt-5">

                    <p className="
                      text-xs
                      lineclamp-2
                      text-gray-500
                      font-medium
                      leading-10
                    ">
                      {item.title}
                    </p>

                    <h2 className="
                      text-3xl
                      font-bold
                      text-gray-900
                      mt-2
                    ">
                      {item.value}
                    </h2>

                  </div>

                </div>

              );
            })}

          </div>
        </>

      )}

    </div>
  );
}