import React, { useEffect, useState } from "react";
import "../components/updateSavingGoal.scss";
import { UserSavingGoal } from "../../../models/UserSavingGoal";
import axios from "axios";
import { handleError } from "../../../helpers/ErrorHandler";
import { savingGoalImages } from "../../../data";
const api = "http://localhost:8080/api/";

type Props = {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  savingGoal: UserSavingGoal;
};
const UpdateSavingGoal = (props: Props) => {
  const [savingGoal, setSavingGoal] = useState<UserSavingGoal>({
    id: props.savingGoal.id,
    savingGoalName: props.savingGoal.savingGoalName,
    savingGoalAmount: props.savingGoal.savingGoalAmount,
    amountSaved: props.savingGoal.amountSaved,
    svgContent: props.savingGoal.svgContent,
  });

  const [selectedImage, setSelectedImage] = useState<string>(
    savingGoal.svgContent
  );
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [wrongGoalName, setWrongGoalName] = useState(false);
  const [wrongGoalAmount, setWrongGoalAmount] = useState(false);

  useEffect(() => {
    setSavingGoal((prevData) => ({
      ...prevData,
      svgContent: selectedImage,
    }));
  }, [selectedImage]);

  const handleDefaultImageClick = () => {
    setShowImagePicker(true);
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setShowImagePicker(false);
  };

  const handleUpdateNewGoalDataChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    
    if (name === "savingGoalAmount") {
      const numericValue = Number(value);
      if (numericValue < 0 || numericValue < savingGoal.amountSaved) {
        setWrongGoalAmount(true);
      } else {
        setWrongGoalAmount(false);
      }
    }
    console.log(name, value)
    setSavingGoal((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (savingGoal.savingGoalName.trim() === "") {
      setWrongGoalName(true);
      return;
    } else {
      setWrongGoalName(false);
    }

    if (wrongGoalAmount) {
      return; 
    }
   console.log(savingGoal)
    axios
      .put(`${api}savingGoals/update/${savingGoal.id}`, savingGoal)
      .then(() => {
        props.setIsEditing(false);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  return (
    <div className="updateSavingGoal">
      <div className="modal">
        <h1>Update Saving Goal</h1>
        <span className="close" onClick={() => props.setIsEditing(false)}>
          X
        </span>
        <div className="goalImage">
          <img
            src={selectedImage || savingGoal.svgContent}
            alt={selectedImage ? "Selected Image" : "actual image"}
            onClick={handleDefaultImageClick}
          />
        </div>
        <div className="imagePicker">
          {showImagePicker && (
            <div className="additionalImages">
              {savingGoalImages.map((image, index) => (
                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                <img
                  key={index}
                  src={image}
                  alt={`Image ${index}`}
                  onClick={() => handleImageClick(image)}
                />
              ))}
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label>Update Goal Name:</label>
            <input
              type="text"
              name="savingGoalName"
              value={savingGoal.savingGoalName}
              onChange={handleUpdateNewGoalDataChange}
            />
            {wrongGoalName && (
              <p className="error">Goal name cannot be empty</p>
            )}
          </div>
          <div className="item">
            <label>Update Goal Target (optional):</label>
            <input
              type="number"
              name="savingGoalAmount"
              value={savingGoal.savingGoalAmount || ""}
              min={0}
              placeholder="Set your target or leave empty"
              onChange={handleUpdateNewGoalDataChange}
            />
            {wrongGoalAmount && (
              <p className="error">
                Target cannot be lower than the saved amount.
              </p>
            )}
          </div>

          <button>Accept Changes</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateSavingGoal;
