
import "./singleView.scss";
import ProgressBar from "../progressBar/ProgressBar";

const SingleView = () => {
  return (
    <div className="singleView">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            <img src="/loan.svg" alt="" />
            <h1>Computer</h1>
          </div>
          <div className="details">
            <div className="item">
              <span className="itemTitle">Loan:</span>
              <span className="titleValue">Computer</span>
            </div>
            <div className="item">
              <span className="itemTitle">Loan:</span>
              <span className="titleValue">Computer</span>
            </div>
            <div className="item">
              <span className="itemTitle">Loan:</span>
              <span className="titleValue">Computer</span>
            </div>
          </div>
        </div>
        <hr />
        <div className="progressContainer">
          <ProgressBar percentage={70} />
          <span>Installment progress</span>
        </div>
      </div>
      <div className="activities">
        <h2>Latest transactions</h2>
        <ul>
          <li>
            <div>
              <p>Loan for computer</p>
              <time>Payment date: 2024:01:01</time>
            </div>
          </li>
          <li>
            <div>
              <p>Loan for computer</p>
              <time>Payment date: 2024:01:01</time>
            </div>
          </li>
          <li>
            <div>
              <p>Loan for computer</p>
              <time>Payment date: 2024:01:01</time>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SingleView;
