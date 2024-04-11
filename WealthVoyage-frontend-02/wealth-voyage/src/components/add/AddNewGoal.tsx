import React, { useEffect, useState } from "react";
import "./addNewGoal.scss";
import Slider from "../utils/slider/Slider";
import { UserSavingGoal } from "../../models/UserSavingGoal";
import axios from "axios";
import { handleError } from "../../helpers/ErrorHandler";
const api = "http://localhost:8080/api/";

type Props = {
  slug: string;
  images: string[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddNewGoal = (props: Props) => {
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("/money.svg");
  const [savingGoal, SetSavingGoal] = useState<UserSavingGoal>({
    id: 0,
    savingGoalName: "",
    savingGoalAmount: 0,
    amountSaved: 0,
    svgContent: "",
  });

  const [wrongGoalName, setWrongGoalName] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [targetValueIsZero, setTargetValueIsZero] = useState(false);
  const [
    targetValueIsLowerThanAmountSaved,
    setTargetValueIsLowerThanAmountSaved,
  ] = useState(false);

  useEffect(() => {
    SetSavingGoal((prevData) => ({
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

  const handleToggleChange = () => {
    setIsChecked(!isChecked);
    console.log(isChecked);
  };

  const handleAddNewGoalDataChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    SetSavingGoal((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (value !== "" && name === "savingGoalName") {
      setWrongGoalName(false);
    }
    if (value !== "" && name === "savingGoalAmount") {
      setTargetValueIsZero(false);
    }
     if ( value !== "" && name === "savingGoalAmount") {
       const targetAmount = parseInt(value)
       const amountSaved = savingGoal.amountSaved;

       setTargetValueIsLowerThanAmountSaved(amountSaved > targetAmount);
     }

  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

      if (savingGoal.savingGoalName.trim() === "") {
        setWrongGoalName(true);
        return; 
      } else {
        setWrongGoalName(false);
      }

    
      if (isChecked && savingGoal.savingGoalAmount <= 0) {
        setTargetValueIsZero(true);
        return; 
      } else {
        setTargetValueIsZero(false);
      }

      if (isChecked && savingGoal.savingGoalAmount < savingGoal.amountSaved) {
        setTargetValueIsLowerThanAmountSaved(true);
        return; 
      } else {
        setTargetValueIsLowerThanAmountSaved(false);
      }

    axios
      .post(`${api}savingGoals/add`, savingGoal)
      .then((response) => {
        console.log(response.data);
        props.setOpen(false);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  return (
    <div className="addNewGoal">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <div className="goalImage">
          <img
            src={selectedImage || props.images[0]}
            alt={selectedImage ? "Selected Image" : "Default Image"}
            onClick={handleDefaultImageClick}
          />
        </div>
        <h1>Add New {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label>Goal Name:</label>
            <input
              type="text"
              name="savingGoalName"
              placeholder="Type saving goal name..."
              value={savingGoal.savingGoalName}
              onChange={handleAddNewGoalDataChange}
            ></input>
            {wrongGoalName && (
              <p className="wrongSavingInput">Goal name cannot be empty</p>
            )}
          </div>

          <div className="item">
            <label>First Deposit:</label>
            <input
              type="number"
              name="amountSaved"
              value={savingGoal.amountSaved}
              onChange={handleAddNewGoalDataChange}
              min={0}
            ></input>
          </div>

          <div className="imagePicker">
            {showImagePicker && (
              <div className="additionalImages">
                {props.images.map((image, index) => (
                  // eslint-disable-next-line jsx-a11y/img-redundant-alt
                  <img
                    key={index}
                    src={image}
                    alt={`Image ${index}`}
                    onClick={() => handleImageClick(image)}
                    className={selectedImage === image ? "selected" : ""}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="sliders">
            <div className="slider1">
              <Slider
                isChecked={isChecked}
                handleToggleChange={handleToggleChange}
              />
              {isChecked ? (
                <p>Savings Target</p>
              ) : (
                <p>Without savings target</p>
              )}
            </div>
          </div>
          {isChecked && (
            <div className="savingsTarget">
              <input
                type="number"
                name="savingGoalAmount"
                placeholder="Target amount [zł]"
                value={savingGoal.savingGoalAmount}
                onChange={handleAddNewGoalDataChange}
                min={0}
              ></input>
              {targetValueIsZero && (
                <p className="wrongSavingInput">
                  Target value cannot be equals 0
                </p>
              )}
              {targetValueIsLowerThanAmountSaved && (
                <p className="wrongSavingInput">
                  Target value cannot be lower than amount saved (first deposit)
                </p>
              )}
            </div>
          )}

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddNewGoal;
