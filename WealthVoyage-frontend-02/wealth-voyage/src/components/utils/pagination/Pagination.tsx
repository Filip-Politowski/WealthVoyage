import React from "react";
import "./pagination.scss"
type Props = {
  currentPage: number;
  startIndex: number;
  endIndex: number;
  itemsPerPage: number;
  currentRows: any;
  filteredRows?: any;
  totalPages: number;
  handlePageChange: (page: number) => void;
};

const pagination = (props: Props) => {
  return (
    <div className="pagination">
      {props.currentPage > 1 && (
        <button
          onClick={() => props.handlePageChange(props.currentPage - 1)}
          disabled={props.currentPage === 1}
        >
          Previous
        </button>
      )}
      <span>
        {props.startIndex + 1}-
        {props.endIndex - (props.itemsPerPage - props.currentRows.length)} of{" "}
        {props.filteredRows.length}
      </span>
      {props.currentPage < props.totalPages && (
        <button
          onClick={() => props.handlePageChange(props.currentPage + 1)}
          disabled={props.currentPage === props.totalPages}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default pagination;
