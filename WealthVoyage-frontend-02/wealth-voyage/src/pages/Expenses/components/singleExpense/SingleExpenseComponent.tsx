
import { SingleExpense } from "../../../../models/SingleExpense";
import "./singleExpense.scss"

type Props = {
  singleExpenses: SingleExpense[];
};

const SingleExpenseComponent = (props: Props) => {
  return (
    <div className="singleExpenses">
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.singleExpenses.map((singleExpense) => (
            <tr key={singleExpense.id}>
              <td>{singleExpense.expenseCategory}</td>
              <td>{singleExpense.amount}</td>
              <td>{singleExpense.date}</td>
              <td>{singleExpense.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SingleExpenseComponent;
