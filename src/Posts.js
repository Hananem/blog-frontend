import React, { useState } from 'react';

const Post = ({ posts }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  const filteredPosts = selectedCategory === 'All' ? posts : posts.filter((post) => post.category === selectedCategory);

  const categories = ['All', ...new Set(posts.map((post) => post.category))]; // Get unique categories

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4 text-black">Latest Posts</h1>
      <div className="flex justify-center space-x-4 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryFilter(category)}
            className={`px-4 py-2 rounded-md text-white ${
              category === selectedCategory ? 'bg-black' : 'bg-gray-500'
            } hover:bg-black hover:text-white transition duration-300`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover object-center" />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-black">{post.title}</h2>
              <p className="text-gray-600 mt-2">{post.description}</p>
              <span className="text-gray-500 mt-4">{post.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;