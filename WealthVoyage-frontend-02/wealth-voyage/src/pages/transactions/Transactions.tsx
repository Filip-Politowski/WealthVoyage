import React, { useState } from 'react'
import "./transactions.scss"

import Add from '../../components/add/Add';
import { GridColDef } from '@mui/x-data-grid';
import { lastTransactions } from '../../data';
import DataTableMobile from '../../components/dataTable/LoanDataTable';




const Transactions = () => {

const [open, setOpen] = useState(false);

  return (
    <div className="transactions">
      <div className="info">
        <h1>Transactions</h1>
        <button onClick={() => setOpen(true)}>Add New Transaction</button>
      </div>
     
      <DataTableMobile
        rows={lastTransactions}
        columns={["ID", "Amount", "Date"]}
        slug={"transaction"}
        filteredKeys={["id", "amount", "date"]}
        searchKeyFilter="date"
        searchPlaceholder='Search by date...'
      />
      {/* {open && <Add setOpen={setOpen} columns={columns} slug="Transaction" />} */}
    </div>
  );
}

export default Transactions
