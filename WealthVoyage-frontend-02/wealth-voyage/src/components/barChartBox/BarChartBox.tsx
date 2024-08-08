import {
  BarChart,
  Bar,
  Tooltip,
  ResponsiveContainer,
  YAxis,
  XAxis,
} from "recharts";
import "./barChartBox.scss";

type Props = {
  title: string;
  color: string;
  dataKey: string;
  chartData: object[];
};


const BarChartBox = (props: Props) => {
  return (
    <div className="barChartBox">
      <h1>{props.title}</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height={200}>
          <BarChart data={props.chartData}>
            <XAxis dataKey="month" />
            <YAxis dataKey="amount" />
            <Tooltip
              contentStyle={{ background: "#3e2a47", borderRadius: "10%" }}
              labelStyle={{ display: "none" }}
              cursor={{ fill: "none" }}
            />
            <Bar dataKey={props.dataKey} fill={props.color} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartBox;
