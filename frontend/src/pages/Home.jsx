import { useState, useEffect } from "react";
import CategoryWithSubCategory from "../components/CategoryWithSubCategory";
import axiosInstance from "../utils/axiosInstance";
import WelcomeUser from "../components/customers/WelcomeUser";
import CartItems from "../components/CartItems";

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
    <div className="flex flex-col gap-2 ">

      {/* HERO / WELCOME SECTION */}
      {user && (
        <>
        <WelcomeUser user={user} defaultAddress={defaultAddress} />
        </>
      )}

      {/* CATEGORY SECTION */}
      <div className="mt-2">
        <CategoryWithSubCategory />
      </div>
      <div
  className="
    fixed
    bottom-6
    right-2
    z-50
  "
>
  <CartItems />
</div>

    </div>
  );
}