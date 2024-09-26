import React, { useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { deleteProfile, getAllUsersProfile } from "../../redux/apiCalls/profileApiCall";
import { FaUser, FaTrashAlt } from "react-icons/fa";

const UsersTable = () => {
  const dispatch = useDispatch();
  const { profiles, isProfileDeleted } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getAllUsersProfile());
  }, [dispatch, isProfileDeleted]);

  // Delete User Handler
  const deleteUserHandler = (userId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteProfile(userId));
      }
    });
  };

  return (
    <section className="flex flex-col md:flex-row min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-semibold text-black mb-6">Users</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 border-b border-gray-300 text-left">Count</th>
                <th className="py-3 px-4 border-b border-gray-300 text-left">User</th>
                <th className="py-3 px-4 border-b border-gray-300 text-left">Email</th>
                <th className="py-3 px-4 border-b border-gray-300 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b border-gray-300">{index + 1}</td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    <div className="flex items-center">
                      <img
                        src={item.profilePhoto?.url}
                        alt=""
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <span className="font-medium text-black">{item.username}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300">{item.email}</td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    <div className="flex space-x-4">
                      <Link
                        to={`/profile/${item._id}`}
                        className="text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <FaUser className="inline mr-1" /> View Profile
                      </Link>
                      <button
                        onClick={() => deleteUserHandler(item._id)}
                        className="text-red-600 hover:text-red-800 flex items-center"
                      >
                        <FaTrashAlt className="inline mr-1" /> Delete User
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default UsersTable;
