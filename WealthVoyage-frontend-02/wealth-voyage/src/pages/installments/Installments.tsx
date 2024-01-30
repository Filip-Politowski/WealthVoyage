import React from "react";
import "./installments.scss";
import DataTable from "../../components/dataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { installmentsRow } from "../../data";

const Installments = () => {

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "loanName",
    headerName: "Loan name",
    width: 150,
    editable: true,
  },
  {
    field: "numberOfInstallments",
    headerName: "Number of installments",
    type: "number",
    align: "center",
    width: 160,
    editable: true,
  },
  {
    field: "installmentAmount",
    headerName: "Installment amount [zł]",
    type: "number",
    align: "center",
    width: 160,
    editable: true,
  },
  {
    field: "endDateOfInstallment",
    headerName: "End date",
    sortable: true,
    width: 150,
  },
];

  return (
    <div className="installments">
      <div className="info">
        <h1>Installments</h1>
        <button>Add new installment</button>
      </div>
      <DataTable columns={columns} rows={installmentsRow}/>
    </div>
  );
};

export default Installments;
