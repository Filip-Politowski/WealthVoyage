
import "./installment.scss";
import SingleView from "../../components/installmentSingleView/InstallmentSingleView";
import { singleInstallment } from "../../data";

const Installment = () => {
  //fetch data
 const progressBar = {
   percentage: singleInstallment.progress,
   color: "rgb(66, 79, 90)",
  
 };
  return (
    <div className="installment">
      <SingleView
        id={singleInstallment.id}
        title={singleInstallment.title}
        activities={singleInstallment.activities}
        img={singleInstallment.img}
        info={singleInstallment.info}
        progress={progressBar}
        
      />
    </div>
  );
};

export default Installment;
