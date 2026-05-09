import { useState } from "react";
import CategoryWithSubCategory from "../components/CategoryWithSubCategory";
import axiosInstance from "../utils/axiosInstance";
import { useEffect } from "react";
import LoginDialog from "./customers/LoginDialog";

export default function Home() {
  const [user, setUser] = useState(null)
  const [showLoginDialog, setShowLoginDialog] = useState(false)

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get("/customer/me")
      setUser(res.data.data)
    } catch (error) {
      setUser(null)
      setShowLoginDialog(true)
    }
  }

  useEffect(() => {
    fetchUser()
  } ,[])
  return (
    <div className="flex flex-col gap-6">

      {/* HERO SECTION (future slider place) */}
      <div className="w-full bg-gradient-to-r from-gray-900 to-zinc-500 text-white p-10 rounded-xl">
        <h1 className="text-xl font-bold">Welcome to Your Store</h1>
        {user ? (
          <p className="text-green-500">Hello, {user.fullName}</p>
        ) : (
          <p className="text-yellow-300">You are not logged in</p>
        )}

       {/* <div className="w-1/3 h-2/3 border-2 border-red-700">
       {showLoginDialog && (
        <LoginDialog onSuccess={() => {
          fetchUser()
          setShowLoginDialog(false)
        }}
        onClose={() => setShowLoginDialog(false)}
        />
       )}
       </div> */}
       
        <p className="text-white mt-1">
          Discover products, deals & categories in one place
        </p>
      </div>

      {/* CATEGORY SECTION */}
      <CategoryWithSubCategory />

    </div>
  );
}