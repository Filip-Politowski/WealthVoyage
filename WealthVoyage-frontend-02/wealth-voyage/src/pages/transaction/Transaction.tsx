import { singleTransaction } from "../../data";
import "./transaction.scss";
import TransactionSingleView from "../../components/transactionSingleView/TransactionSingleView";

const transaction = () => {
  return (
    <div className="transaction">
      <TransactionSingleView transaction={singleTransaction}/>
    </div>
  );
};

export default transaction;
