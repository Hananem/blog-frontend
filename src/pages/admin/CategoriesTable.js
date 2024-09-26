import React, { useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, fetchCategories } from "../../redux/apiCalls/categoryApiCall";
import { FaTrashAlt } from "react-icons/fa";

const CategoriesTable = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Delete Category Handler
  const deleteCategoryHandler = (categoryId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteCategory(categoryId));
      }
    });
  };

  return (
    <section className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-semibold text-black mb-6">Categories</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 border-b border-gray-300 text-left">Count</th>
                <th className="py-3 px-4 border-b border-gray-300 text-left">Category Title</th>
                <th className="py-3 px-4 border-b border-gray-300 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b border-gray-300">{index + 1}</td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    <span className="font-medium text-black">{item.title}</span>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    <button
                      onClick={() => deleteCategoryHandler(item._id)}
                      className="text-red-500 hover:text-red-700 transition duration-300"
                    >
                      <FaTrashAlt size={20} />
                    </button>
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

export default CategoriesTable;

