import React, { useEffect, useState } from "react";
import "./pieChartBox.scss";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import axios from "axios";
import { handleError } from "../../helpers/ErrorHandler";
const api = "http://localhost:8080/api/";


const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      style={{ fontSize: "24px" }}
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
};

const PieChartBox = () => {

const [userSavings, setUserSavings] = useState<number>(0);
const [userSavingsAmount, setUserSavingsAmount] = useState<number>(0);

   useEffect(() => {
     const fetchUserSavingsSum = async () => {
       try {
         const response = await axios.get(`${api}savingGoals/get/sum`);
         setUserSavings(response.data);
       } catch (error) {
         handleError(error);
       }
     };
     fetchUserSavingsSum();
   }, [userSavings]);
    useEffect(() => {
      const fetchUserSavingsSum = async () => {
        try {
          const response = await axios.get(`${api}savingGoals/get/amount/sum`);
          setUserSavingsAmount(response.data);
        } catch (error) {
          handleError(error);
        }
      };
      fetchUserSavingsSum();
    }, [userSavings]);


const data = [
  { name: "Saved", value: userSavings, color: "#02735e" },
  { name: "Goal", value: userSavingsAmount, color: "#F28705" },
];
  return (
    <div className="pieChartBox">
      <h1>Goals</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
            />
            <Pie
              data={data}
              labelLine={false}
              outerRadius={"90%"}
              dataKey="value"
              label={renderCustomizedLabel}
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="options">
        {data.map((item) => (
          <div className="option" key={item.name}>
            <div className="title">
              <div className="dot" style={{ backgroundColor: item.color }} />
              <span>{item.name}</span>
            </div>
            <span>{item.value} zł</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartBox;
