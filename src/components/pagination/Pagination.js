const Pagination = ({ pages, currentPage, setCurrentPage }) => {
    const generatedPages = [];
    for (let i = 1; i <= pages; i++) {
      generatedPages.push(i);
    }
  
    return (
      <div className="flex items-center justify-center space-x-2 mt-4">
        <button
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300 disabled:bg-gray-400 dark:disabled:bg-gray-600"
          onClick={() => setCurrentPage((current) => current - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {generatedPages.map((page) => (
          <div
            onClick={() => setCurrentPage(page)}
            key={page}
            className={`px-4 py-2 cursor-pointer rounded-lg ${
              currentPage === page
                ? "bg-black text-white"
                : "bg-white text-black border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"
            } transition-colors duration-300`}
          >
            {page}
          </div>
        ))}
        <button
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300 disabled:bg-gray-400 dark:disabled:bg-gray-600"
          onClick={() => setCurrentPage((current) => current + 1)}
          disabled={currentPage === pages}
        >
          Next
        </button>
      </div>
    );
  };
  
  export default Pagination;
  