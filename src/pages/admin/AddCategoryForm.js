import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createCategory } from "../../redux/apiCalls/categoryApiCall";

const AddCategoryForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Category Title is required");

    dispatch(createCategory({ title }));
    setTitle("");
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h6 className="text-xl font-bold mb-4 text-black">Add New Category</h6>
      <form onSubmit={formSubmitHandler}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-black mb-1">
            Category Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter Category Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
