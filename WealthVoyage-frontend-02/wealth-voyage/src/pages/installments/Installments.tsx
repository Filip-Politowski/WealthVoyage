import React from "react";
import "./installments.scss";
import DataTable from "../../components/dataTable/DataTable";

const Installments = () => {
  return (
    <div className="installments">
      <div className="info">
        <h1>Installments</h1>
        <button>Add new installment</button>
      </div>
      <DataTable />
    </div>
  );
};

export default Installments;
