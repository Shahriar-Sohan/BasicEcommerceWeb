import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";

function DashboardLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        {/* Sidebar: Positioned correctly */}
        <Sidebar />
        {/* Main Content: It should remain centered without shifting */}
        <main className="flex-1 p-6 pt-20 md:pt-16 transition-all duration-300">
          {/* Outlet for nested routes */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;