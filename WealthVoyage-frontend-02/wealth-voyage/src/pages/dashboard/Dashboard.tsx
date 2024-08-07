
import "./dashboard.scss";
import TopBox from "../../components/topBox/TopBox";
import ChartBox from "../../components/chartBox/ChartBox";
import { barChartBox1, barChartBox2, chartBoxSavings } from "../../data";
import BarChartBox from "../../components/barChartBox/BarChartBox";
import PieChartBox from "../../components/pieChartBox/PieChartBox";
import BigChartBox from "../../components/bigChartBox/BigChartBox";


const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="box box1">
        <TopBox />
      </div>
      <div className="box box2">
        <ChartBox {...chartBoxSavings} />
      </div>
      <div className="box box3">
        <ChartBox {...chartBoxSavings} />
      </div>
      <div className="box box4">
        <PieChartBox />
      </div>
      <div className="box box5">
        <ChartBox {...chartBoxSavings} />
      </div>
      <div className="box box6">
        <ChartBox {...chartBoxSavings} />
      </div>
      <div className="box box7">
        <BigChartBox />
      </div>
      <div className="box box8">
        <BarChartBox {...barChartBox1} />
      </div>
      <div className="box box9">
        <BarChartBox {...barChartBox2} />
      </div>
    </div>
  );
};

export default Dashboard;
