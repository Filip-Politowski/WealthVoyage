import React from "react";
import "./deleteElement.scss";
import axios from "axios";
import { handleError } from "../../helpers/ErrorHandler";
import { useNavigate } from "react-router-dom";

type Props = {
  setDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
};

const DeleteElement = (props: Props) => {


  // const handleDelete = () => {
  //   const deleteSelectedElement = async () => {
  //     try {
  //       await axios.delete(props.endpointUrl);
  //       props.setDeleting(!props.deleting);
  //       props.setIsDeleting(!props.isDeleting);
  //     } catch (error) {
  //       handleError(error);
  //     }
  //   };
  //   deleteSelectedElement();

  // };
  return (
    <div className="deleteElement">
      <div className="modal">
        <span className="close" onClick={() => props.setDeleting(false)}>
          X
        </span>
        <h2>
          Are you sure that you want to delete element ?
        </h2>
        <div className="deletingButtons">
          <button
            onClick={() => props.setDeleting(false)}
            className="deleteButton"
          >
            No
          </button>
          <button onClick={props.handleDelete}>yes</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteElement;
