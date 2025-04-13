import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar.jsx"
import Header from "../components/Header.jsx"

function DashboardLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 pt-16">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
