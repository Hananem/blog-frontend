import AdminMain from "./AdminMain";
import AdminSidebar from "./AdminSidebar";
import { useState } from "react";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <section className="min-h-screen">
      {/* Toggle button for small screens */}
      <button
        onClick={toggleSidebar}
        className="md:hidden p-2 text-white bg-gray-900 fixed top-0 left-0"
      >
        {isSidebarOpen ? "Close" : "Open"} Sidebar
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block md:w-1/4 bg-black text-white p-4 fixed md:relative z-20 h-full`}
      >
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className={`md:ml-1/4 p-4 ${isSidebarOpen ? "md:ml-1/4" : ""}`}>
        <AdminMain />
      </div>
    </section>
  );
};

export default AdminDashboard;
