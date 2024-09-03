import React, { useState } from "react";
import { Transaction } from "../../models/Transaction";
import { useNavigate } from "react-router-dom";
import Pagination from "../utils/pagination/Pagination";
import "./transactionDataTable.scss";


type Props = {
  rows: Transaction[];
  columns: string[];
  searchKeyFilter: string;
  filteredKeys: string[];
};

const TransactionDataTable = (props: Props) => {
  const navigate = useNavigate();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  console.log(props.columns)
  console.log(props.rows);
  const totalPages = Math.ceil(props.rows.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const filteredRows = props.rows.filter((row: any) =>
    row[props.searchKeyFilter].toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRows = filteredRows.slice(startIndex, endIndex);

  const handleNavigateToSingleTransaction = (id: number) => {
    navigate(`/dashboard/transaction/${id}`);
  };
  return (
    <div className="dataTable">
      <div className="searchBar">
        <img src="/search.svg" alt="" />
        <input
          type="text"
          placeholder={"Search by name..."}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <table className="rowsTable">
        <thead>
          <tr>
            <th>No.</th>

            {props.columns.map((column: string) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row: any, index: number) => (
            <tr key={index + 1 + (currentPage - 1) * itemsPerPage}>
              <td>{index + 1 + (currentPage - 1) * itemsPerPage}.</td>
              {props.filteredKeys.map((key) => (
                <td
                  key={key}
                  onClick={() => handleNavigateToSingleTransaction(row.id)}
                >
                  <div className="contentArea">
                    {typeof row[key] === "number" && key !== "id" ? (
                      <p className={key}>{`${row[key].toFixed(2)} zł`}</p>
                    ) : (
                      <p className={key}>{row[key]}</p>
                    )}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
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

export default TransactionDataTable;
