import "./installmentSingleView.scss";
import ProgressBar from "../utils/progressBar/ProgressBar";


type Props = {
  id: number;
  img?: string;
  title: string;
  info: object;
  progress?: {
    percentage: number;
    color: string;
  };
  activities?: {
    dueDate: string;
    loanName: string;
  }[];
};

const InstallmentSingleView = (props: Props) => {
  const formatVariableName = (input: string): string => {
    const words = input.replace(/([a-z])([A-Z])/g, "$1 $2");
    const firstLetter = words.charAt(0).toUpperCase();
    const restOfTheText = words.slice(1, words.length);

    const result = firstLetter + restOfTheText.toLowerCase();
    return result;
  };

  return (
    <div className="singleView">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            {props.img && <img src={props.img} alt="" />}
            <h1>{props.title.toUpperCase()}</h1>
            <button>Update</button>
          </div>
          <div className="details">
            {Object.entries(props.info)
              .slice(1)
              .map((item) => (
                <div className="item" key={item[0]}>
                  <span className="itemTitle">
                    {formatVariableName(item[0])}:
                  </span>
                  <span className="titleValue">{item[1]}</span>
                </div>
              ))}
          </div>
        </div>

        {props.progress && (
          <div className="progressContainer">
            <ProgressBar
              percentage={props.progress.percentage}
              color={props.progress.color}
            />
            <span>Progress</span>
          </div>
        )}
      </div>
      {props.activities && (
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
      )}
    </div>
  );
};

export default InstallmentSingleView;
