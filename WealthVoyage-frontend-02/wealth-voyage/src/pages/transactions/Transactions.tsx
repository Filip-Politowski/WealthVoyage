import { useState } from 'react'
import "./transactions.scss"
import { lastTransactions } from '../../data';
import DataTable from '../../components/dataTable/DataTable';
import ProgressBar from '../../components/utils/progressBar/ProgressBar';



const Transactions = () => {

const [open, setOpen] = useState(false);
const [ deleting, setDeleting] = useState<boolean>(false);

  return (
    <div className="transactions">
      <div className="info">
        <h1>Transactions</h1>
        <button onClick={() => setOpen(true)}>Add New Transaction</button>
      </div>
     
      {/* <DataTable
        rows={lastTransactions}
        columns={["ID", "Amount", "Date"]}
        navigateTo={"transaction"}
        slug={"transaction"}
        filteredKeys={["id", "amount", "date"]}
        searchKeyFilter="date"
        searchPlaceholder='Search by date...'
        deleting={deleting}
        setDeleting={setDeleting}
      /> */}
      {/* {open && <Add setOpen={setOpen} columns={columns} slug="Transaction" />} */}
      <ProgressBar  color='white' percentage={50} />
    </div>
  );
}

export default Transactions
