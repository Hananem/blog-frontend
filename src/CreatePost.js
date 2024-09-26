import { useState, useEffect } from "react";
import "./create-post.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [file, setFile] = useState(null);
  
    // Form Submit Handler
    const formSubmitHandler = (e) => {
      e.preventDefault();
      if (title.trim() === "") return toast.error("Post Title is required");
      if (category.trim() === "") return toast.error("Post Category is required");
      if (description.trim() === "")
        return toast.error("Post Description is required");
      if (!file) return toast.error("Post Image is required");
  
      const formData = new FormData();
      formData.append("image", file);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
  
    };
  
    const navigate = useNavigate();
 
  

  return (
    <div className="min-h-screen bg-white flex justify-center items-center">
      <div className="max-w-md w-full px-4 py-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-black">Create a New Post</h2>
        <form  className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-black">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-black">Description</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            ></textarea>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-black">Category</label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            >
              <option value="">Select Category</option>
              <option value="technology">Technology</option>
              <option value="travel">Travel</option>
              <option value="food">Food</option>
              {/* Add more categories as needed */}
            </select>
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-black">Image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <input
          type="file"
          name="file"
          id="file"
          className="create-post-upload"
          onChange={(e) => setFile(e.target.files[0])}
        />
          <button type="submit" className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800">Create Post</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
