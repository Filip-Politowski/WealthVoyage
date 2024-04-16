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
    setSavingGoal((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          </div>
          <div className="item">
            <label>Update Goal Target:</label>
            <input
              type="number"
              name="savingGoalAmount"
              value={savingGoal.savingGoalAmount}
              onChange={handleUpdateNewGoalDataChange}
            />
          </div>

          <button>Accept Changes</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateSavingGoal;
