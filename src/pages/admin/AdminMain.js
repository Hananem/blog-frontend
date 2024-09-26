import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";
import { getUsersCount } from "../../redux/apiCalls/profileApiCall";
import { getPostsCount } from "../../redux/apiCalls/postApiCall";
import { fetchAllComments } from "../../redux/apiCalls/commentApiCall";
import AddCategoryForm from "./AddCategoryForm";
import { FaUser, FaFileAlt, FaTags, FaComments } from "react-icons/fa";

const AdminMain = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { usersCount } = useSelector((state) => state.profile);
  const { postsCount } = useSelector((state) => state.post);
  const { comments } = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getUsersCount());
    dispatch(getPostsCount());
    dispatch(fetchAllComments());
  }, [dispatch]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h5 className="text-xl font-semibold text-black">Users</h5>
          <div className="text-3xl font-bold text-black mb-2">{usersCount}</div>
          <div className="flex justify-between items-center">
            <Link to="/admin-dashboard/users-table" className="text-blue-600 hover:underline">
              See all users
            </Link>
            <div className="text-2xl text-gray-600">
              <FaUser />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h5 className="text-xl font-semibold text-black">Posts</h5>
          <div className="text-3xl font-bold text-black mb-2">{postsCount}</div>
          <div className="flex justify-between items-center">
            <Link to="/admin-dashboard/posts-table" className="text-blue-600 hover:underline">
              See all posts
            </Link>
            <div className="text-2xl text-gray-600">
              <FaFileAlt />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h5 className="text-xl font-semibold text-black">Categories</h5>
          <div className="text-3xl font-bold text-black mb-2">{categories.length}</div>
          <div className="flex justify-between items-center">
            <Link to="/admin-dashboard/categories-table" className="text-blue-600 hover:underline">
              See all categories
            </Link>
            <div className="text-2xl text-gray-600">
              <FaTags />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h5 className="text-xl font-semibold text-black">Comments</h5>
          <div className="text-3xl font-bold text-black mb-2">{comments.length}</div>
          <div className="flex justify-between items-center">
            <Link to="/admin-dashboard/comments-table" className="text-blue-600 hover:underline">
              See all comments
            </Link>
            <div className="text-2xl text-gray-600">
              <FaComments />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <AddCategoryForm />
      </div>
    </div>
  );
};

export default AdminMain;

