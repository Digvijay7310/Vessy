import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"

export default function Layout() {
  return (
    <div>
      {/* Example Navbar */}
      <div className="bg-black text-white p-4">
        <h1>My Store</h1>
      </div>

      {/* Page Content */}
      <div className="p-4">
        <Outlet />
      </div>

      {/* Example Footer */}
      <div className="bg-gray-200 p-4 text-center">
        <Footer />
      </div>
    </div>
  )
}