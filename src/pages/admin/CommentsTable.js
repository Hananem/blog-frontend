import React, { useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, fetchAllComments } from "../../redux/apiCalls/commentApiCall";
import { FaTrashAlt } from "react-icons/fa";

const CommentsTable = () => {
  const dispatch = useDispatch();
  const { comments } = useSelector(state => state.comment);

  useEffect(() => {
    dispatch(fetchAllComments());
  }, [dispatch]);

  // Delete Comment Handler
  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteComment(commentId));
      }
    });
  };

  return (
    <section className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-semibold text-black mb-6">Comments</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 border-b border-gray-300 text-left">Count</th>
                <th className="py-3 px-4 border-b border-gray-300 text-left">User</th>
                <th className="py-3 px-4 border-b border-gray-300 text-left">Comment</th>
                <th className="py-3 px-4 border-b border-gray-300 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b border-gray-300">{index + 1}</td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    <div className="flex items-center">
                      <img
                        src={item.user.profilePhoto?.url}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover mr-4"
                      />
                      <span className="text-sm font-medium text-black">{item.user.username}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">{item.text}</td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    <button
                      onClick={() => deleteCommentHandler(item._id)}
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

export default CommentsTable;
