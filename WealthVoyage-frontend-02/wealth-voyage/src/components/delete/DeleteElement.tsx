import React from "react";
import "./deleteElement.scss";
import axios from "axios";
import { handleError } from "../../helpers/ErrorHandler";
import { useNavigate } from "react-router-dom";

type Props = {
  endpointUrl: string;
  describeElementToDelete: string;
  setDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  deleting: boolean;
  isDeleting: boolean;
  redirectUrl: string;
};

const DeleteElement = (props: Props) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    const deleteSelectedElement = async () => {
      try {
        await axios.delete(props.endpointUrl);
        props.setDeleting(!props.deleting);
        props.setIsDeleting(!props.isDeleting);
      } catch (error) {
        handleError(error);
      }
    };
    deleteSelectedElement();

    navigate(props.redirectUrl);
  };
  return (
    <div className="deleteElement">
      <div className="modal">
        <span className="close" onClick={() => props.setIsDeleting(false)}>
          X
        </span>
        <h2>
          Are you sure that you want to delete {props.describeElementToDelete}
        </h2>
        <div className="deletingButtons">
          <button
            onClick={() => props.setIsDeleting(false)}
            className="deleteButton"
          >
            No
          </button>
          <button onClick={handleDelete}>yes</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteElement;
