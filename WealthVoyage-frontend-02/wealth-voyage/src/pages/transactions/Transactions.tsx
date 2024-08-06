import { useEffect, useState } from "react";
import "./transactions.scss";
import TransactionDataTable from "../../components/dataTable/TransactionDataTable";
import axios from "axios";
import { Transaction } from "../../models/Transaction";
import { handleError } from "../../helpers/ErrorHandler";

const api = "http://localhost:8080/api/";

const Transactions = () => {
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchUserTransactions = async () => {
      try {
        const response = await axios.get(`${api}transactions/all`);
        setTransactions(response.data.content);
      } catch (error) {
        handleError(error);
      }
    };
    fetchUserTransactions();
  }, []);

  return (
    <div className="transactions">
      <div className="info">
        <h1>Transactions</h1>
        
      </div>
      <TransactionDataTable
        rows={transactions}
        columns={["Amount", "Date", "Transaction Name", "Transaction Type"]}
        filteredKeys={["amount", "date", "transactionName", "transactionType"]}
        searchKeyFilter="date"
      />
 
    </div>
  );
};

export default Transactions;
