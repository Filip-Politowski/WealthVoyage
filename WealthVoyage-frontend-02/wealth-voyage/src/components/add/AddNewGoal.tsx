import React, { useState } from "react";
import "./addNewGoal.scss";
import { GridColDef } from "@mui/x-data-grid";
import Slider from "../utils/slider/Slider";

type Props = {
  columns: GridColDef[];
  slug: string;
  images: string[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddNewGoal = (props: Props) => {
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const finalImage = selectedImage || props.images[0];
    console.log("Submitted with image:", finalImage);
  };

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
          {props.columns
            .filter((item) => item.field !== "id")
            .map((column) => (
              <div className="item">
                <label>{column.headerName}</label>
                <input type={column.type} placeholder={column.field} min={0}></input>
              </div>
            ))}

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
              <input type="number" placeholder="Target amount [zł]" min={0}></input>
            </div>
          )}

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddNewGoal;
