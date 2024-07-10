import React from 'react'

const Pagination = (props:{
    currentPage:number,
    totalPages:number,
    goToPage:(page:number)=>void
}) => {
  return (
    <div className="pagination">
      {props.currentPage > 1 && (
        <button onClick={() => props.goToPage(props.currentPage - 1)}>
          Previous
        </button>
      )}
      <span>
        Page {props.currentPage} of {props.totalPages}
      </span>
      {props.currentPage < props.totalPages && (
        <button onClick={() => props.goToPage(props.currentPage + 1)}>
          Next
        </button>
      )}
    </div>
  );
}

export default Pagination
