import { useEffect, useState } from "react";
import "./loans.scss";

import Add from "../../components/add/Add";
import DataTableMobile from "../../components/dataTable/LoanDataTable";
import { Loan } from "../../models/Loan";
import axios from "axios";
import { handleError } from "../../helpers/ErrorHandler";
const api = "http://localhost:8080/api/";



const Loans = () => {
  const [open, setOpen] = useState(false);
  const [loans, setLoans] = useState<Loan[]>([]);
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
  }, [open]);

  return (
    <div className="loans">
      <div className="info">
        <h1>Loans</h1>
        <button onClick={() => setOpen(true)}>Add New Loan</button>
      </div>
      <DataTableMobile
        rows={loans}
        columns={["ID", "Loan Name", "Amount of installment"]}
        slug={"installment"}
        filteredKeys={["id", "loanName", "amountOfSingleInstallment"]}
        searchKeyFilter="loanName"
      />
      {open && <Add setOpen={setOpen} loan={loan} setLoan={setLoan}/>}
    </div>
  );
};

export default Loans;
