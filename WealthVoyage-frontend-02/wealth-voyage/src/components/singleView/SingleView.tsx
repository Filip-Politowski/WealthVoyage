import "./singleView.scss";
import ProgressBar from "../progressBar/ProgressBar";

type Props = {
  id: number;
  img?: string;
  title: string;
  info: object;
  percentageOfPaidInstallments: number;
  activities?: {
    dueDate: string;
    loanName: string;
  }[];
};

const SingleView = (props: Props) => {
  return (
    <div className="singleView">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            <img src={props.img} alt="" />
            <h1>{props.title}</h1>
            <button>Update</button>
          </div>
          <div className="details">
            {Object.entries(props.info).map((item) => (
              <div className="item" key={item[0]}>
                <span className="itemTitle">{item[0]}:</span>
                <span className="titleValue">{item[1]}</span>
              </div>
            ))}
          </div>
        </div>
        <hr />
        <div className="progressContainer">
          <ProgressBar percentage={props.percentageOfPaidInstallments} />
          <span>Installment progress</span>
        </div>
      </div>
      <div className="activities">
        <h2>Latest transactions</h2>
        {props.activities && (
          <ul>
            {props.activities.map((activity) => (
              <li key={activity.loanName}>
                <div>
                  <p>{activity.loanName}</p>
                  <time>Payment date: {activity.dueDate}</time>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SingleView;
