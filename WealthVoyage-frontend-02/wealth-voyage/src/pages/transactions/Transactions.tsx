import { useEffect, useState } from "react";
import "./transactions.scss";
import TransactionDataTable from "../../components/dataTable/TransactionDataTable";
import axios from "axios";
import { Transaction } from "../../models/Transaction";
import { handleError } from "../../helpers/ErrorHandler";
const api = "http://localhost:8080/api/";

const Transactions = () => {
  const [open, setOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchUserTransactions = async () => {
      try {
        const response = await axios.get(`${api}transactions/all`);
        setTransactions(response.data);
      } catch (error) {
        handleError(error);
      }
    };
    fetchUserTransactions();
  }, [open]);
  
  return (
    <div className="transactions">
      <div className="info">
        <h1>Transactions</h1>
        <button onClick={() => setOpen(true)}>Add New Transaction</button>
      </div>
      <TransactionDataTable
        rows={transactions}
        columns={["Amount", "Date", "Category", "Transaction Type"]}
        filteredKeys={["amount", "date", "category", "transactionType"]}
        searchKeyFilter="date"
      />
    </div>
  );
};

export default Transactions;
