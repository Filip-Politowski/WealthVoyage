import React, { useState } from "react";
import "./dataTableMobile.scss";
import Pagination from "../utils/pagination/Pagination";
import { Link } from "react-router-dom";

type Props = {
  rows: object[];
  columns: string[];
  slug: string;
  filteredKeys: string[];
  searchKeyFilter: string;
  searchPlaceholder?: string;
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
    row[props.searchKeyFilter].toLowerCase().includes(searchQuery.toLowerCase())
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
          placeholder= {props.searchPlaceholder ? props.searchPlaceholder : "Search..."}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <table className="rowsTable">
        <thead>
          <tr>
            {props.columns.map((column: string) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row: any) => (
            <tr key={row.id}>
              {props.filteredKeys.map((key) => (
                <td key={key}>
                  <Link to={`/${props.slug}/${row.id}`}>
                    {row[key] === row["paymentDate"] ? (
                      <div className="singleInstallmentPrice">
                        <div>
                          <p>{row["priceOfSingleInstallment"]} zł</p>
                        </div>
                        <p>{row[key]}</p>
                      </div>
                    ) : row[key] === row["amount"] ? (
                      <p>{row[key]} zł</p>
                    ) : (
                      <p>{row[key]}</p>
                    )}
                  </Link>
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

export default DataTableMobile;
