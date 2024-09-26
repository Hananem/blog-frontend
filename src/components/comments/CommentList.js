import swal from "sweetalert";
import { useState } from "react";
import UpdateCommentModal from "./UpdateCommentModal";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../redux/apiCalls/commentApiCall";

const CommentList = ({ comments }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [updateComment, setUpdateComment] = useState(false);
  const [commentForUpdate, setCommentForUpdate] = useState(null);

  // Update Comment Handler
  const updateCommentHandler = (comment) => {
    setCommentForUpdate(comment);
    setUpdateComment(true);
  };

  // Delete Comment Handler
  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteComment(commentId));
      }
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
      <h4 className="text-xl font-semibold mb-4">{comments?.length} Comments</h4>
      {comments?.map((comment) => (
        <div key={comment._id} className="border-b border-gray-300 dark:border-gray-600 pb-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-black dark:text-white font-medium">{comment.username}</div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              <Moment fromNow>{comment.createdAt}</Moment> ago
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-2">{comment.text}</p>
          {user?._id === comment.user && (
            <div className="flex space-x-2 text-gray-500 dark:text-gray-400">
              <i
                onClick={() => updateCommentHandler(comment)}
                className="bi bi-pencil-square cursor-pointer hover:text-black dark:hover:text-white transition-colors duration-300"
              ></i>
              <i
                onClick={() => deleteCommentHandler(comment?._id)}
                className="bi bi-trash-fill cursor-pointer hover:text-black dark:hover:text-white transition-colors duration-300"
              ></i>
            </div>
          )}
        </div>
      ))}
      {updateComment && (
        <UpdateCommentModal
          commentForUpdate={commentForUpdate}
          setUpdateComment={setUpdateComment}
        />
      )}
    </div>
  );
};

export default CommentList;
