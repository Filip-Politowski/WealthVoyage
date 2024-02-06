import React, { useState } from "react";
import "./addNewGoal.scss";
import { GridColDef } from "@mui/x-data-grid";

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

  return (
    <div className="addNewGoal">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add New {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "id")
            .map((column) => (
              <div className="item">
                <label>{column.headerName}</label>
                <input type={column.type} placeholder={column.field}></input>
              </div>
            ))}
          <div className="imagePicker">
            <img
              src={selectedImage || props.images[0]}
              alt={selectedImage ? "Selected Image" : "Default Image"}
              onClick={handleDefaultImageClick}
            />
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
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddNewGoal;