import "./backButton.scss";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackToPreviousPage = () => {
    navigate(-1);
  };
  return (
    <div className="backButton" onClick={handleBackToPreviousPage}>
      <img src="/back-arrow.svg" alt="back arrow" />
    </div>
  );
};

export default BackButton;
