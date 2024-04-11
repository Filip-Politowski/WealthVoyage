import React, { useEffect, useState } from "react";
import SingleViewGoal from "../../components/singleViewGoal/SingleViewGoal";
import { UserSavingGoal } from "../../models/UserSavingGoal";
import { handleError } from "../../helpers/ErrorHandler";
import { useParams } from "react-router-dom";
import axios from "axios";

const api = "http://localhost:8080/api/";

const SavingGoal = () => {
  const [userSavingGoal, setUserSavingGoal] = useState<UserSavingGoal>({
    id: 0,
    savingGoalName: "",
    savingGoalAmount: 0,
    amountSaved: 0,
    svgContent: "",
  });



  const { id } = useParams();

  useEffect(() => {
    const fetchUserSavingGoal = async () => {
      try {
        const response = await axios.get(`${api}savingGoals/get/${id}`);
        setUserSavingGoal(response.data);
        console.log(userSavingGoal);
      } catch (error) {
        handleError(error);
      }
    };
    fetchUserSavingGoal();
  }, []);

  return (
    <div className="savingGoal">
      <SingleViewGoal savingGoal={userSavingGoal} />
    </div>
  );
};

export default SavingGoal;
