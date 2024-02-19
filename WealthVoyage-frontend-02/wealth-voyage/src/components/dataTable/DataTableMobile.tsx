import React, { useState } from "react";
import "./dataTableMobile.scss";

type Props = {
  rows: object[];
  slug: string;
};

const DataTableMobile = (props: Props) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const totalPages = Math.ceil(props.rows.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const filteredRows = props.rows.filter((row: any) =>
    row.loanName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRows = filteredRows.slice(startIndex, endIndex);

  return (
    <div className="dataTableMobile">
      <div className="searchBar">
       <img src="/searchBlack.svg" alt="" />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="rows">
        <div className="rowsHeader">
          <p>ID</p>
          <p>Loan Name</p>
          <p>Payment Date</p>
        </div>

        {currentRows.map((row: any) => (
          <div className="row" key={row.id}>
            <p>{row.id}</p>
            <p>{row.loanName}</p>
            <div className="paymentDetails">
              <p className="price">{row.priceOfSingleInstallment} zł</p>
              <p>{row.paymentDate}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          {startIndex + 1}-{endIndex - (itemsPerPage - currentRows.length)} of{" "}
          {filteredRows.length}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTableMobile;
