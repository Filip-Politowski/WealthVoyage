import { useEffect, useState } from "react";
import "./loans.scss";
import Add from "../../components/add/Add";
import DataTable from "../../components/dataTable/DataTable";
import { Loan } from "../../models/Loan";
import axios from "axios";
import { handleError } from "../../helpers/ErrorHandler";
import PayButtonWindow from "../../components/payButtonWindow/PayButtonWindow";
import DeleteElement from "../../components/delete/DeleteElement";

const api = "http://localhost:8080/api/";

 export interface LoanWithPayment {
    loan: Loan;
    nextPaymentDate: string;
}
  

const Loans = () => {
  const [open, setOpen] = useState(false);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [paying, setPaying] = useState<boolean>(false);
  const [loanId, setLoanId] = useState<number>(0);
  const [loan, setLoan] = useState<Loan>({
    id: 0,
    loanName: "",
    numberOfInstallments: 0,
    numberOfPaidInstallments: 0,
    totalAmountOfLoan: 0,
    startDateOfInstallment: "",
    endDateOFInstallment: "",
    amountOfSingleInstallment: 0,
    loanStatus: "UNPAID",
  });
   const [loansWithPayments, setLoansWithPayments] = useState<
     LoanWithPayment[]
   >([]); 


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
  }, [open, deleting, loan]);


  const handlePay = () => {
    const foundObject = loans.find((item) => item.id === loanId);
    try {
      axios.post(`${api}loans/pay-instalment`, foundObject);
      window.location.reload();
    } catch (error) {
      handleError(error);
    }
  };

  const handleDelete = () => {
    try {
      axios.delete(`${api}loans/delete/${loanId}`);
      setDeleting(false);
      window.location.reload();
    } catch (error) {
      handleError(error);
    }
  };

  const fetchNextPaymentDate = async (loan:Loan): Promise<string> => {
    const response = await axios.post(`${api}paymentDate/getNearestPaymentDate`, loan);
    return response.data; 
  };

 const mergeLoansWithPaymentDates = async () => {
   const loansWithPayments: LoanWithPayment[] = [];
   for (const loan of loans) {
     const nextPaymentDate = await fetchNextPaymentDate(loan);
     loansWithPayments.push({ loan, nextPaymentDate });
   }
   return loansWithPayments;
 };
   useEffect(() => {
     const fetchData = async () => {
       const data = await mergeLoansWithPaymentDates();
       setLoansWithPayments(data);
     };
     fetchData();
   }, [loans]); 



  return (
    <div className="loans">
      <div className="info">
        <h1>Loans</h1>
        <button onClick={() => setOpen(true)}>Add New Loan</button>
      </div>
      <DataTable
        rows={loans}
        columns={[
          "Loan Name",
          "Amount of installment",
        ]}
        navigateTo={"installment"}
        slug={"loans"}
        filteredKeys={["loanName", "amountOfSingleInstallment"]}
        searchKeyFilter="loanName"
        setDeleting={setDeleting}
        setPaying={setPaying}
        actionButtonsActive={true}
        actionButtons={["delete", "paid"]}
        setElementId={setLoanId}
        loansWithPayment={loansWithPayments}
      />
      {paying && (
        <PayButtonWindow setPaying={setPaying} handlePay={handlePay} />
      )}
      {deleting && (
        <DeleteElement setDeleting={setDeleting} handleDelete={handleDelete} />
      )}

      {open && <Add setOpen={setOpen} loan={loan} setLoan={setLoan} />}
    </div>
  );
};

export default Loans;
