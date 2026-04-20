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
      <div>
        <Outlet />
      </div>

      {/* Example Footer */}
      <hr />
        <Footer />
    </div>
  )
}