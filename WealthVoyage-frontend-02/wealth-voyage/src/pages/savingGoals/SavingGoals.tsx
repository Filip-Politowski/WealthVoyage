import React, { useState } from "react";
import "./savingGoals.scss";
import AddNewGoal from "../../components/add/AddNewGoal";
import { GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "goalName",
    headerName: "Goal name",
    type: "string",
  },
  {
    field: "amount",
    headerName: "Amount",
    type: "number",
  },
];

const SavingGoals = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="savingGoals">
      <div className="newGoals">
        <h1>New Goals</h1>
        <button onClick={() => setOpen(true)}>Add New Goal</button>
      </div>
      <div className="goals">
        <div className="box">
          <img src="homeImg.svg" alt="" />
          <span>Dom</span>
          <p>200 zł</p>
        </div>
        <div className="box">
          <img src="car.svg" alt="" />
          <span>Samochód</span>
          <p>200 zł</p>
        </div>
        <div className="box">
          <img src="games.svg" alt="" />
          <span>Rozrywka</span>
          <p>200 zł</p>
        </div>
      </div>
      {open && (
        <AddNewGoal
          setOpen={setOpen}
          columns={columns}
          slug="Goal"
          images={[
            "/money.svg",
            "/car.svg",
            "/homeImg.svg",
            "/bike.svg",
            "/gift.svg",
            "/games.svg",
          ]}
        />
      )}
    </div>
  );
};

export default SavingGoals;
