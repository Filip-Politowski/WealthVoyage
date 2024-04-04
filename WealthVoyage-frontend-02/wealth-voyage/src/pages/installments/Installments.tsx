import React, { useState } from "react";
import "./installments.scss";
import DataTable from "../../components/dataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { installmentsRow } from "../../data";
import Add from "../../components/add/Add";
import DataTableMobile from "../../components/dataTable/DataTableMobile";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "loanName",
    headerName: "Loan name",
    type: "string",
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
    field: "paymentDate",
    headerName: "Payment date",
    type: "string",
    sortable: true,
    width: 150,
    editable: true,
  },
  {
    field: "endDateOfInstallment",
    headerName: "End date",
    type: "string",
    sortable: true,
    width: 150,
  },
  {
    field: "priceOfSingleInstallment",
    headerName: "Price of single installment [zł]",
    type: "number",
    align: "center",
    sortable: true,
    width: 150,
  },
];

const Installments = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="installments">
      <div className="info">
        <h1>Loans</h1>
        <button onClick={() => setOpen(true)}>Add New Loan</button>
      </div>
      {/* PC version */}
      <DataTable
        slug={"installment"}
        columns={columns}
        rows={installmentsRow}
      />
      {/* Mobil version */}
      <DataTableMobile
        rows={installmentsRow}
        columns={["ID", "Loan Name", "Payment Date"]}
        slug={"installment"}
        filteredKeys={["id","loanName","paymentDate"]}
        searchKeyFilter="loanName"
      />
      {open && <Add setOpen={setOpen} columns={columns} slug="Loan" />}
    </div>
  );
};

export default Installments;
