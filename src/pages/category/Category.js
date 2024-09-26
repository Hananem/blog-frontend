import { useParams, Link } from "react-router-dom";
import PostList from "../../components/posts/PostList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsBasedOnCategory } from "../../redux/apiCalls/postApiCall";

const Category = () => {
  const dispatch = useDispatch();
  const { postsCate } = useSelector((state) => state.post);

  const { category } = useParams();

  useEffect(() => {
    dispatch(fetchPostsBasedOnCategory(category));
    window.scrollTo(0, 0);
  }, [category, dispatch]);

  return (
    <section className="container mx-auto p-6">
      {postsCate.length === 0 ? (
        <>
          <h1 className="text-center text-2xl font-bold mb-6">
            Posts with <span className="text-black dark:text-white">{category}</span> category not found
          </h1>
          <Link 
            to="/posts" 
            className="block text-center bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-300 dark:bg-white dark:text-black dark:hover:bg-gray-300"
          >
            Go to posts page
          </Link>
        </>
      ) : (
        <>
          <h1 className="text-center text-2xl font-bold mb-6">Posts based on {category}</h1>
          <PostList posts={postsCate} />
        </>
      )}
    </section>
  );
};

export default Category;