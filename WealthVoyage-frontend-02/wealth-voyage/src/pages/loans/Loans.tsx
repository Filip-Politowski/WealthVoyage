import { useEffect, useState } from "react";
import "./loans.scss";
import Add from "../../components/add/Add";
import DataTable from "../../components/dataTable/DataTable";
import { Loan } from "../../models/Loan";
import axios from "axios";
import { handleError } from "../../helpers/ErrorHandler";

const api = "http://localhost:8080/api/";



const Loans = () => {
  const [open, setOpen] = useState(false);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [ deleting, setDeleting] = useState<boolean>(false);
  const [loan, setLoan] = useState<Loan>({
    id: 0, 
    loanName: "",
    numberOfInstallments: 0,
    numberOfPaidInstallments: 0,
    totalAmountOfLoan: 0,
    startDateOfInstallment: "",
    endDateOFInstallment: "",
    loanStatus: "UNPAID",
  });
  useEffect(() => {
    const fetchUserLoans = async () => {
      try {
        const response = await axios.get(`${api}loans/all`);
        setLoans(response.data);
      } catch (error) {
        handleError(error);
      }
    };

    fetchUserLoans();
    console.log(loans);
  }, [open, deleting]);

  return (
    <div className="loans">
      <div className="info">
        <h1>Loans</h1>
        <button onClick={() => setOpen(true)}>Add New Loan</button>
      </div>
      <DataTable
        rows={loans}
        columns={["Loan Name", "Amount of installment"]}
        navigateTo={"installment"}
        slug={"loans"}
        filteredKeys={["loanName", "amountOfSingleInstallment"]}
        searchKeyFilter="loanName"
        deleting= {deleting}
        setDeleting={setDeleting}
        actionButtonsActive={true}
        actionButtons={["delete", "paid"]}
      />
      {open && <Add setOpen={setOpen} loan={loan} setLoan={setLoan} />}
    </div>
  );
};

export default Loans;
