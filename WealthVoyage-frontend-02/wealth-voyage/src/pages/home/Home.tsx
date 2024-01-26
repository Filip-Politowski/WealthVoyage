import React from "react";
import "./home.scss";
import TopBox from "../../components/topBox/TopBox";
import ChartBox from "../../components/chartBox/ChartBox";
import { barChartBox1, barChartBox2, chartBoxSavings } from "../../data";
import BarChartBox from "../../components/barChartBox/BarChartBox";

const Home = () => {
  return (
    <div className="home">
      <div className="box box1">
        <TopBox />
      </div>
      <div className="box box2">
        <ChartBox {...chartBoxSavings} />
      </div>
      <div className="box box3">
        <ChartBox {...chartBoxSavings} />
      </div>
      <div className="box box4">Box4</div>
      <div className="box box5">
        <ChartBox {...chartBoxSavings} />
      </div>
      <div className="box box6">
        <ChartBox {...chartBoxSavings} />
      </div>
      <div className="box box7">Box7</div>
      <div className="box box8">
        <BarChartBox {...barChartBox1} />
      </div>
      <div className="box box9">
        <BarChartBox {...barChartBox2} />
      </div>
    </div>
  );
};

export default Home;
