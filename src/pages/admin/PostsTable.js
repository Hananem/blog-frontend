import React, { useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, deletePost } from "../../redux/apiCalls/postApiCall";
import { FaEye, FaTrashAlt } from "react-icons/fa";

const PostsTable = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  // Delete Post Handler
  const deletePostHandler = (postId) => {
    // Your delete post logic here
    dispatch(deletePost(postId));
  };

  return (
    <section className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-semibold text-black mb-6">Posts</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 border-b border-gray-300 text-left">Count</th>
                <th className="py-3 px-4 border-b border-gray-300 text-left">User</th>
                <th className="py-3 px-4 border-b border-gray-300 text-left">Post Title</th>
                <th className="py-3 px-4 border-b border-gray-300 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b border-gray-300">{index + 1}</td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    <div className="flex items-center">
                      <img
                        src={item.user.profilePhoto?.url}
                        alt="User Profile"
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <span className="font-medium text-black">{item.user.username}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300">{item.title}</td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    <div className="flex space-x-4">
                      <Link
                        to={`/posts/details/${item._id}`}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEye size={20} />
                      </Link>
                      <button
                        onClick={() => deletePostHandler(item._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrashAlt size={20} />
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

export default PostsTable;

