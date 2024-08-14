export type BarChartBoxData = {
  title: string;
  color: string;
  dataKey: string;
  chartData: {
    amount: number;
    month: string;
  }[];
};
