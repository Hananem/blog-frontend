import PostList from "../../components/posts/PostList";
import Sidebar from "../../components/sidebar/Sidebar";
import Pagination from "../../components/pagination/Pagination";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getPostsCount } from "../../redux/apiCalls/postApiCall";

const POST_PER_PAGE = 3;

const PostsPage = () => {
  const dispatch = useDispatch();
  const { postsCount, posts } = useSelector(state => state.post);

  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil(postsCount / POST_PER_PAGE);

  useEffect(() => {
    dispatch(fetchPosts(currentPage));
    window.scrollTo(0, 0);
  }, [currentPage, dispatch]);

  useEffect(() => {
    dispatch(getPostsCount());
  }, [dispatch]);

  return (
    <>
      <section className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <PostList posts={posts} />
        </div>
        <div>
          <Sidebar />
        </div>
      </section>
      <Pagination 
       pages={pages} 
       currentPage={currentPage}
       setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default PostsPage;
