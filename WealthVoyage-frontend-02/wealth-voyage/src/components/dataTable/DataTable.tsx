import { useState } from "react";
import "./dataTable.scss";
import Pagination from "../utils/pagination/Pagination";
import { useNavigate } from "react-router-dom";
import DeleteElement from "../delete/DeleteElement";
import axios from "axios";
const api = "http://localhost:8080/api/";

type Props = {
  rows: object[];
  columns: string[];
  navigateTo: string;
  slug: string;
  filteredKeys: string[];
  searchKeyFilter: string;
  searchPlaceholder?: string;
  deleting?: boolean;
  setDeleting?: React.Dispatch<React.SetStateAction<boolean>>;
  actionButtonsActive?: boolean;
  actionButtons?: string[];
  handlePayButton?: (id: number) => void;
};

const DataTable = (props: Props) => {
  const navigate = useNavigate();
  const itemsPerPage = 5;
  const [elementId, setElementId] = useState<number>();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
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

  const formatNumber = (value: number) => {
    return `${value.toFixed(2)} zł`;
  };

  const handleNavigateToSingleLoan = (id: number) => {
    navigate(`/dashboard/${props.navigateTo}/${id}`);
  };
  const handleDeleteElement = (id: number) => {
    setIsDeleting(true);
    setElementId(id);
  };

 
  
  return (
    <div className="dataTable">
      <div className="searchBar">
        <img src="/search.svg" alt="" />
        <input
          type="text"
          placeholder={
            props.searchPlaceholder ? props.searchPlaceholder : "Search..."
          }
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
            {props.actionButtonsActive ? <th>Actions</th> : <th></th>}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row: any, index: number) => (
            <tr key={index}>
              <td>{index + 1}.</td>
              {props.filteredKeys.map((key) => (
                <td
                  key={key}
                  onClick={() => handleNavigateToSingleLoan(row.id)}
                >
                  <div className="contentArea">
                    {typeof row[key] === "number" && key !== "id" ? (
                      <p className={key}>{formatNumber(row[key])}</p>
                    ) : (
                      <p className={key}>{row[key]}</p>
                    )}
                  </div>
                </td>
              ))}
              <td>
                {props.actionButtons && (
                  <div className="actionButtons">
                    {props.actionButtons.map((button) => (
                      <>
                      
                        <img
                          src={`/${button}.svg`}
                          alt="button"
                          className={`${button}Button`}
                          onClick={() => {
                            if (button === "delete") {
                              handleDeleteElement(row.id);
                            }
                            if(button ==="paid"){
                              props.handlePayButton &&
                              props.handlePayButton(row.id);
                            }
                          }}
                        />
                      </>
                    ))}
                  </div>
                )}
              </td>
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
      {isDeleting ? (
        <DeleteElement
          deleting={props.deleting !== undefined ? props.deleting : false}
          isDeleting={isDeleting}
          describeElementToDelete="Loan"
          setDeleting={
            props.setDeleting !== undefined ? props.setDeleting : () => {}
          }
          endpointUrl={`${api}${props.slug}/delete/${elementId}`}
          setIsDeleting={setIsDeleting}
          redirectUrl={`/dashboard/${props.slug}`}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default DataTable;
