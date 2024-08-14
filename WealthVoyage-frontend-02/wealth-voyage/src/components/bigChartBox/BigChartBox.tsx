import React, { useEffect, useState } from "react";
import "./bigChartBox.scss";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
  ReferenceLine,
} from "recharts";
import { BigChartData } from "../../models/BigChartData";

const BigChartBox = (props: {
  incomes: number[];
  expenses: number[];
  months: string[];
}) => {
  const [bigChartData, setBigChartData] = useState<BigChartData[]>([]);

  useEffect(() => {
    const updatedChartData: BigChartData[] = props.months.map(
      (month, index) => ({
        name: month,
        income: props.incomes[index],
        expense: props.expenses[index],
        savings:
          Math.round((props.incomes[index] - props.expenses[index]) * 100) /
          100,
      })
    );
    setBigChartData(updatedChartData);
  }, [props.incomes, props.expenses, props.months]);
  console.log(bigChartData);

  return (
    <div className="bigChartBox">
      <h1>Income to Revenue</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={bigChartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              contentStyle={{ background: "#3e2a47", borderRadius: "10%" }}
              labelStyle={{ display: "none" }}
              cursor={{ fill: "rgba(242, 135, 5, 0.1)" }}
            />
            <Legend />
            <ReferenceLine y={0} stroke="#ffffff" />
            <Bar dataKey="income" fill="#32CD32" />
            <Bar dataKey="expense" fill="#F28705" />
            <Bar dataKey="savings" fill="gold" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BigChartBox;
