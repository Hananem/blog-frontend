import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createComment } from "../../redux/apiCalls/commentApiCall";

const AddComment = ({ postId }) => {
    const dispatch = useDispatch();
    const [text, setText] = useState("");

    // Form Submit Handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (text.trim() === "") return toast.error("Please write something");

        dispatch(createComment({ text, postId }));
        setText("");
    };

    return (
        <form onSubmit={formSubmitHandler} className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <input
                type="text"
                placeholder="Add a comment"
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300 dark:bg-white dark:text-black dark:hover:bg-gray-300"
            >
                Comment
            </button>
        </form>
    );
};

export default AddComment;