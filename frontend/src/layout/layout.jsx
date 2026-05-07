import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"

export default function Layout() {
  return (
    <div className="max-w-7xl mx-auto">
      <Header />

      {/* Page Content */}
      <main className="min-h-screen bg-gray-50 px-3 max-w-7xl mx-auto">
        <Outlet />
      </main>

      {/* Example Footer */}
        <Footer />
    </div>
  )
}