import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h5 className="text-2xl font-bold mb-6 text-gray-800">Categories</h5>
      <ul className="space-y-4">
        {categories.map((category) => (
          <li key={category._id}>
            <Link
              className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition duration-200 font-bold"
              to={`/posts/categories/${category.title}`}
            >
              {category.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
