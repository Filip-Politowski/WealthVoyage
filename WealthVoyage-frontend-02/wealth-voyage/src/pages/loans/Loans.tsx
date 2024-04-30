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
  const [deleting, setDeleting] = useState<boolean>(false);
  const [loan, setLoan] = useState<Loan>({
    id: 0,
    loanName: "",
    numberOfInstallments: 0,
    numberOfPaidInstallments: 0,
    totalAmountOfLoan: 0,
    startDateOfInstallment: "",
    endDateOFInstallment: "",
    amountOfSingleInstallment: 0,
    entityRelationshipNumber: "",
    loanStatus: "UNPAID",
  });

  useEffect(() => {
    const fetchUserLoans = async () => {
      try {
        const response = await axios.get(`${api}loans/all`);
        setLoans(response.data);
        console.log(loan.entityRelationshipNumber);
      } catch (error) {
        handleError(error);
      }
    };

    fetchUserLoans();
  }, [open, deleting]);

  const handlePayButton = (id: number) => {
    const foundObject = loans.find((item) => item.id === id);
    try {
      axios.post(`${api}loans/pay-instalment`, foundObject);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="loans">
      <div className="info">
        <h1>Loans</h1>
        <button onClick={() => setOpen(true)}>Add New Loan</button>
      </div>
      <DataTable
        rows={loans}
        columns={["Loan Name", "Amount to pay", "Amount of installment"]}
        navigateTo={"installment"}
        slug={"loans"}
        filteredKeys={[
          "loanName",
          "amountOfSingleInstallment",
          "amountOfSingleInstallment",
        ]}
        searchKeyFilter="loanName"
        deleting={deleting}
        setDeleting={setDeleting}
        handlePayButton={handlePayButton}
        actionButtonsActive={true}
        actionButtons={["delete", "paid"]}
      />
      {open && <Add setOpen={setOpen} loan={loan} setLoan={setLoan} />}
    </div>
  );
};

export default Loans;
