import React, { useState } from "react";
import "./dataTableMobile.scss";
import Pagination from "../utils/pagination/Pagination";

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
        <img src="/search.svg" alt="" />
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
      <Pagination
        currentPage={currentPage}
        currentRows={currentRows}
        endIndex={endIndex}
        filteredRows={filteredRows}
        handlePageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        startIndex={startIndex}
        totalPages={totalPages}
      />
    </div>
  );
};

export default DataTableMobile;
