import React, { useEffect, useState } from "react";
import "./chartBox.scss";
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from "recharts";
import { ExchangeRateTable } from "../../models/ExchangeRateTable";

const ChartBox = () => {
  const [exchangeRateTable, setExchangeRateTable] = useState<
    ExchangeRateTable[]
  >([]);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [yAxisDomain, setYAxisDomain] = useState<[number, number]>([0, 1]);

  const getFormattedDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const today = new Date();
  const oneMonthAgo = new Date(today);
  oneMonthAgo.setMonth(today.getMonth() - 1);

  const todayStr = getFormattedDate(today);
  const oneMonthAgoStr = getFormattedDate(oneMonthAgo);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const rates: { [date: string]: ExchangeRateTable } = {};

        const gbpResponse = await fetch(
          `http://api.nbp.pl/api/exchangerates/rates/a/gbp/${oneMonthAgoStr}/${todayStr}/`
        );
        const gbpData = await gbpResponse.json();
        gbpData.rates.forEach((rate: any) => {
          if (!rates[rate.effectiveDate]) {
            rates[rate.effectiveDate] = {
              date: rate.effectiveDate,
              GBP: rate.mid,
              USD: 0,
              EUR: 0,
            };
          } else {
            rates[rate.effectiveDate].GBP = rate.mid;
          }
        });

        const usdResponse = await fetch(
          `http://api.nbp.pl/api/exchangerates/rates/a/usd/${oneMonthAgoStr}/${todayStr}/`
        );
        const usdData = await usdResponse.json();
        usdData.rates.forEach((rate: any) => {
          if (!rates[rate.effectiveDate]) {
            rates[rate.effectiveDate] = {
              date: rate.effectiveDate,
              GBP: 0,
              USD: rate.mid,
              EUR: 0,
            };
          } else {
            rates[rate.effectiveDate].USD = rate.mid;
          }
        });

        const eurResponse = await fetch(
          `http://api.nbp.pl/api/exchangerates/rates/a/eur/${oneMonthAgoStr}/${todayStr}/`
        );
        const eurData = await eurResponse.json();
        eurData.rates.forEach((rate: any) => {
          if (!rates[rate.effectiveDate]) {
            rates[rate.effectiveDate] = {
              date: rate.effectiveDate,
              GBP: 0,
              USD: 0,
              EUR: rate.mid,
            };
          } else {
            rates[rate.effectiveDate].EUR = rate.mid;
          }
        });

        const ratesArray = Object.values(rates);
        setExchangeRateTable(ratesArray);
        setDataLoaded(true);

        const { minValue, maxValue } = findMinMaxValues(ratesArray);
        setYAxisDomain([minValue, maxValue]);
      } catch (error) {
        console.error("Failed to fetch exchange rates", error);
      }
    };

    fetchExchangeRates();
  }, [todayStr, oneMonthAgoStr]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { date, GBP, USD, EUR } = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p className="label">{date}</p>
          <p className="intro">GBP: {GBP}</p>
          <p className="intro">EUR: {EUR}</p>
          <p className="intro">USD: {USD}</p>
        </div>
      );
    }
    return null;
  };

  const findMinMaxValues = (data: ExchangeRateTable[]) => {
    const allValues = data.flatMap(({ GBP, USD, EUR }) => [GBP, USD, EUR]);

    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);

    return { minValue, maxValue };
  };
  return (
    <div className="chartBox">
      <h3>Currency value 1M</h3>
      {dataLoaded && (
        <div className="chartInfo">
          <div className="chart">
            <ResponsiveContainer width="99%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={exchangeRateTable}
                margin={{
                  top: 5,
                  right: 30,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="0.2 0.2"
                  vertical={false}
                  horizontal={true}
                />

                <YAxis domain={yAxisDomain} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="GBP"
                  stroke="#8884d8"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="EUR"
                  stroke="#82ca9d"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="USD"
                  stroke="#ff7300"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartBox;
