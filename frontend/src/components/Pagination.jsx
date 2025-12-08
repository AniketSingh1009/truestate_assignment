import React from 'react';

const Pagination = ({ page, totalPages, total, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 6;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(page - 1);
        pages.push(page);
        pages.push(page + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="pagination">
      <div className="pagination-controls">
        <button 
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          ‹
        </button>
        
        {getPageNumbers().map((pageNum, index) => (
          pageNum === '...' ? (
            <span key={`ellipsis-${index}`} style={{ padding: '0 0.5rem' }}>...</span>
          ) : (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={page === pageNum ? 'active' : ''}
            >
              {pageNum}
            </button>
          )
        ))}
        
        <button 
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default Pagination;
