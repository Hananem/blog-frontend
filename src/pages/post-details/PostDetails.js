import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";
import swal from "sweetalert";
import UpdatePostModal from "./UpdatePostModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  fetchSinglePost,
  toggleLikePost,
  updatePostImage,
} from "../../redux/apiCalls/postApiCall";
import { BiImageAdd, BiPencil, BiTrash } from "react-icons/bi";
import { HiOutlineThumbUp } from "react-icons/hi";
import { HiThumbUp } from "react-icons/hi";
const PostDetails = () => {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

  const { id } = useParams();

  const [file, setFile] = useState(null);
  const [updatePost, setUpdatePost] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchSinglePost(id));
  }, [id, dispatch]);

  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("There is no file!");

    const formData = new FormData();
    formData.append("image", file);
    dispatch(updatePostImage(formData, post?._id));
  };

  const navigate = useNavigate();

  const deletePostHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deletePost(post?._id));
        navigate(`/profile/${user?._id}`);
      }
    });
  };

  return (
    <section className="container mx-auto p-4">
      <div className="relative">
        <img
          src={file ? URL.createObjectURL(file) : post?.image.url}
          alt=""
          className="w-full max-w-full h-96 object-cover rounded-lg"
        />
        {user?._id === post?.user?._id && (
          <form
            onSubmit={updateImageSubmitHandler}
            className="absolute top-4 left-4"
          >
            <label htmlFor="file" className="flex items-center cursor-pointer">
              <BiImageAdd className="text-white text-2xl mr-2" />
              <span className="text-white">Select new image</span>
            </label>
            <input
              style={{ display: "none" }}
              type="file"
              name="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button
              type="submit"
              className="mt-2 py-2 px-4 bg-black text-white rounded"
            >
              Upload
            </button>
          </form>
        )}
      </div>
      <h1 className="text-4xl font-bold mt-4 mb-2">{post?.title}</h1>
      <div className="flex items-center mb-4">
        <img
          src={post?.user.profilePhoto?.url}
          alt=""
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <strong className="text-lg">
            <Link to={`/profile/${post?.user._id}`}>{post?.user.username}</Link>
          </strong>
          <span className="block text-gray-600">
            {new Date(post?.createdAt).toDateString()}
          </span>
        </div>
      </div>
      <p className="text-lg leading-relaxed mb-4">{post?.description}</p>
      <div className="flex items-center mb-4 space-x-4">
        <div>
          {user && (
            <i
              onClick={() => dispatch(toggleLikePost(post?._id))}
              className={`${
                post?.likes.includes(user?._id)
                  ? "text-2xl cursor-pointer"
                  : "text-2xl cursor-pointer"
              }`}
            >
              {post?.likes.includes(user?._id) ? (
                <HiThumbUp />
              ) : (
                <HiOutlineThumbUp />
              )}
            </i>
          )}
          <small className="ml-2 text-gray-600">{post?.likes.length} likes</small>
        </div>
        {user?._id === post?.user?._id && (
          <div className="flex space-x-2">
            <i
              onClick={() => setUpdatePost(true)}
              className="text-2xl cursor-pointer"
            >
              <BiPencil />
            </i>
            <i
              onClick={deletePostHandler}
              className="text-2xl cursor-pointer"
            >
              <BiTrash />
            </i>
          </div>
        )}
      </div>
      {user ? (
        <AddComment postId={post?._id} />
      ) : (
        <p className="text-gray-600 mb-4">
          To write a comment, you should login first.
        </p>
      )}
      <CommentList comments={post?.comments} />
      {updatePost && (
        <UpdatePostModal post={post} setUpdatePost={setUpdatePost} />
      )}
    </section>
  );
};

export default PostDetails;
