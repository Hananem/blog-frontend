import { Link } from "react-router-dom";

const PostItem = ({ post, username, userId }) => {
  const profileLink = userId ? `/profile/${userId}` : `/profile/${post?.user?._id}`;
  
  const truncateDescription = (description, wordLimit) => {
    const words = description.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : description;
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="mb-4">
        <img src={post?.image.url} alt="" className="w-full h-48 object-cover rounded-lg" />
      </div>
      <div className="mb-4">
        <div className="mb-2">
          <strong>Author: </strong>
          <Link
            className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
            to={profileLink}
          >
            {username ? username : post?.user.username}
          </Link>
        </div>
        <div className="text-gray-600 dark:text-gray-400">
          {new Date(post?.createdAt).toDateString()}
        </div>
      </div>
      <div className="mb-4">
        <h4 className="text-2xl font-bold mb-2">{post?.title}</h4>
        <Link
          className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
          to={`/posts/categories/${post?.category}`}
        >
          {post?.category}
        </Link>
      </div>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        {truncateDescription(post?.description, 40)}
      </p>
      <Link
        className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300 font-bold"
        to={`/posts/details/${post?._id}`}
      >
        Read More...
      </Link>
    </div>
  );
};

export default PostItem;

