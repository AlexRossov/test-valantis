import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ totalPages, currentPage, paginate }) => {
  const handlePageClick = (selectedPage) => {
    paginate(selectedPage.selected + 1);
  };

  return (
    <div>
      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          onPageChange={handlePageClick}
          forcePage={currentPage - 1}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      )}
    </div>
  );
};

export default Pagination;
