import "./dashboard.scss";
import TopBox from "../../components/topBox/TopBox";
import ChartBox from "../../components/chartBox/ChartBox";
import { chartBoxSavings } from "../../data";

import PieChartBox from "../../components/pieChartBox/PieChartBox";
import BigChartBox from "../../components/bigChartBox/BigChartBox";

import { useEffect, useState } from "react";
import axios from "axios";
import { handleError } from "../../helpers/ErrorHandler";
import { BarChartBoxData } from "../../models/BarChartBox";
import BarChartBox from "../../components/barChartBox/BarChartBox";
const api = "http://localhost:8080/api/";


const Dashboard = () => {
  const [barChartBox1, setBarChartBox1] = useState<BarChartBoxData>({
    title: "Incomes in current month [zł]",
    color: "#32CD32",
    dataKey: "amount",
    chartData: [],
  });
    const [barChartBox2, setBarChartBox2] = useState<BarChartBoxData>({
      title: "Expenses in current month [zł]",
      color: "#F28705",
      dataKey: "amount",
      chartData: [],
    });

  useEffect(() => {
    axios
      .get(`${api}transactions/incomes/last/six/months/INCOME`)
      .then((response) => {
        const processedData = response.data.map((item: any) => ({
          ...item,
          month: item.month.substring(0, 3).toUpperCase(),
        }));

        setBarChartBox1((prevState) => ({
          ...prevState,
          chartData: processedData,
        }));
      })
      .catch((error) => {
        handleError(error);
      });
  }, []);
   useEffect(() => {
     axios
       .get(`${api}transactions/incomes/last/six/months/EXPENSE`)
       .then((response) => {
         const processedData = response.data.map((item: any) => ({
           ...item,
           month: item.month.substring(0, 3).toUpperCase(),
         }));

         setBarChartBox2((prevState) => ({
           ...prevState,
           chartData: processedData,
         }));
       })
       .catch((error) => {
         handleError(error);
       });
   }, []);

 

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
        <BigChartBox incomes={barChartBox1.chartData.map(item => item.amount)} expenses={barChartBox2.chartData.map(item => item.amount)} months={barChartBox1.chartData.map(item => item.month)}/>
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
