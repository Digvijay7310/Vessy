import { useState, useEffect } from "react";
import CategoryWithSubCategory from "../components/CategoryWithSubCategory";
import axiosInstance from "../utils/axiosInstance";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/customer/me");
        setUser(res.data);
      } catch (error) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const defaultAddress = user?.customer?.shippingAddresses?.find(
    (addr) => addr.isDefault
  );

  return (
    <div className="flex flex-col gap-6 px-4 lg:px-0">

      {/* HERO / WELCOME SECTION */}
      {user && (
        <div
          className="
            w-full
            rounded-2xl
            bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700
            text-white
            p-6 md:p-8
            shadow-lg
          "
        >
          <h1 className="text-lg md:text-xl font-bold">
            Welcome back 👋
          </h1>

          <p className="text-emerald-200 mt-1 text-sm md:text-base">
            {user?.customer?.fullName}
          </p>

          {/* ADDRESS CARD */}
          {defaultAddress && (
            <div
              className="
                mt-5
                max-w-md
                bg-white/10
                backdrop-blur-xl
                p-4
                rounded-xl
                border border-white/20
              "
            >
              <p className="text-xs uppercase tracking-widest text-white/70">
                Default Delivery Address
              </p>

              <p className="text-sm font-semibold mt-2">
                {defaultAddress.name}
              </p>

              <p className="text-sm text-white/80 mt-1 line-clamp-2">
                {defaultAddress.street}
              </p>

              <div className="flex items-center justify-between mt-3 text-sm">
                <span className="text-white/80">
                  📍 {defaultAddress.city}
                </span>

                <span className="font-bold text-yellow-300">
                  PIN {defaultAddress.pincode}
                </span>
              </div>
            </div>
          )}

          <p className="text-white/70 mt-5 text-sm">
            Discover fresh products, offers & categories tailored for you
          </p>
        </div>
      )}

      {/* CATEGORY SECTION */}
      <div className="mt-2">
        <CategoryWithSubCategory />
      </div>

    </div>
  );
}