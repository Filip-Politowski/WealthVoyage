import React, { useEffect, useState } from "react";
import "./addNewGoal.scss";
import Slider from "../utils/slider/Slider";
import { SavingGoal } from "../../models/SavingGoal";
import axios from "axios";
import { handleError } from "../../helpers/ErrorHandler";
import { useNavigate } from "react-router-dom";
const api = "http://localhost:8080/api/";

type Props = {
  slug: string;
  images: string[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddNewGoal = (props: Props) => {
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [savingGoal, SetSavingGoal] = useState<SavingGoal>({
    id: 0,
    savingGoalName: "",
    savingGoalAmount: 0,
    amountSaved: 0,
    svgContent: "",
  });
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

  const [isChecked, setIsChecked] = useState(false);

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
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
            <div className="firstDeposit">
              <input
                type="number"
                name="savingGoalAmount"
                placeholder="Target amount [zł]"
                value={savingGoal.savingGoalAmount}
                onChange={handleAddNewGoalDataChange}
                min={0}
              ></input>
            </div>
          )}

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddNewGoal;
