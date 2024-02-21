import React, { useState } from 'react'
import "./transactions.scss"
import DataTable from '../../components/dataTable/DataTable';
import Add from '../../components/add/Add';
import { GridColDef } from '@mui/x-data-grid';
import { lastTransactions } from '../../data';
import DataTableMobile from '../../components/dataTable/DataTableMobile';


const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "date",
    headerName: "Date",
    type: "string",
    width: 150,
    editable: false,
  },
  {
    field: "transactionType",
    headerName: "Transaction type",
    type: "string",
    width: 150,
    editable: false,
  },
  {
    field: "category",
    headerName: "Category",
    type: "string",
    width: 150,
    editable: false,
  },
  {
    field: "amount",
    headerName: "Amount",
    type: "string",
    width: 150,
    editable: false,
  },
];

const Transactions = () => {

const [open, setOpen] = useState(false);

  return (
    <div className="transactions">
      <div className="info">
        <h1>Transactions</h1>
        <button onClick={() => setOpen(true)}>Add New Transaction</button>
      </div>
      <DataTable
        slug={"transactions"}
        columns={columns}
        rows={lastTransactions}
      />
      <DataTableMobile
        rows={lastTransactions}
        columns={["ID", "Amount", "Date"]}
        slug={"transaction"}
        filteredKeys={["id", "amount", "date"]}
        searchKeyFilter="date"
        searchPlaceholder='Search by date...'
      />
      {open && <Add setOpen={setOpen} columns={columns} slug="Transaction" />}
    </div>
  );
}

export default Transactions
