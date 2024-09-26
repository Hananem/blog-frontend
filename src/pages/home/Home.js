import PostList from "../../components/posts/PostList";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "../../redux/apiCalls/postApiCall";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchPosts(1));
  }, [dispatch]);

  return (
    <section className="min-h-screen bg-gray-100 p-4">
      <div className="bg-black text-white py-8 text-center">
        <h1 className="text-4xl font-bold">Welcome to Blog</h1>
      </div>
      <div className="text-center my-8 text-2xl font-semibold">
        Latest Posts
      </div>
      <div className="container mx-auto flex flex-col md:flex-row md:space-x-4">
        {loading ? (
          <p className="text-center text-xl">Loading...</p>
        ) : error ? (
          <p className="text-center text-xl text-red-500">
            Error fetching posts: {error.message}
          </p>
        ) : posts.length === 0 ? (
          <p className="text-center text-xl">No posts available.</p>
        ) : (
          <div className="w-full md:w-2/3">
            <PostList posts={posts} />
          </div>
        )}
        <div className="w-full md:w-1/3 mt-8 md:mt-0">
          <Sidebar />
        </div>
      </div>
      <div className="text-center my-8">
        <Link
          to="/posts"
          className="inline-block bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
        >
          See All Posts
        </Link>
      </div>
    </section>
  );
};

export default Home;
