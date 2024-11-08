import React from 'react';

const Pagination = ({ currentPage, totalPages, setCurrentPage, loading }) => {
  return (
    <div className="flex justify-center mt-4">
      {loading ? (
        <div className="p-2 border rounded-full mx-1 h-10 flex items-center justify-center">
          Loading...
        </div>
      ) : (
        <>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 border rounded-full mx-1 h-10 flex items-center justify-center"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`p-2 border rounded-full mx-1 w-10 h-10 flex items-center justify-center ${currentPage === i + 1 ? 'bg-[#8A4CAB] text-white' : ''}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 border rounded-full mx-1 h-10 flex items-center justify-center"
          >
            Next
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
