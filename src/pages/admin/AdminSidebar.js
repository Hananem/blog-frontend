import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaColumns, FaUser, FaFileAlt, FaTags, FaComments, FaBars } from "react-icons/fa";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Toggle button for small screens */}
      <button
        onClick={toggleSidebar}
        className="md:hidden p-2 text-white bg-gray-900"
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:block w-full md:w-1/4 bg-black text-white p-4 fixed md:relative z-20 h-full`}
      >
        <Link to="/admin-dashboard" className="text-2xl font-bold mb-6 flex items-center">
          <FaColumns className="mr-2" />
          Dashboard
        </Link>
        <ul className="space-y-4">
          <li>
            <Link to="/admin-dashboard/users-table" className="flex items-center hover:text-gray-400">
              <FaUser className="mr-2" />
              Users
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/posts-table" className="flex items-center hover:text-gray-400">
              <FaFileAlt className="mr-2" />
              Posts
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/categories-table" className="flex items-center hover:text-gray-400">
              <FaTags className="mr-2" />
              Categories
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/comments-table" className="flex items-center hover:text-gray-400">
              <FaComments className="mr-2" />
              Comments
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
