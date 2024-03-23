import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Line } from "react-chartjs-2";
import DateRangeSelector from "@/components/date-selector";
import { LineChartData } from "@/types/trens.types";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const MultiLineChart = ({
  getData,
  defaultStartDate,
  defaultEndDate,
  typeOne,
  typeTwo,
  urlOne,
  urlTwo,
}: {
  getData: (startDate: string, endDate: string, url: string) => Promise<any>;
  defaultStartDate: string;
  defaultEndDate: string;
  typeOne: string;
  typeTwo: string;
  urlOne: string;
  urlTwo: string;
}) => {
  const [labels, setLabels] = useState<string[]>([]);
  const [dataOne, setDataOne] = useState<string[]>([]);
  const [dataTwo, setDataTwo] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const colors = useMemo(() => [getRandomColor(), getRandomColor()], []);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const resultOne = await getData(startDate, endDate, urlOne);
      setLabels(resultOne.map((item: LineChartData) => item["date"]));
      setDataOne(resultOne.map((item: LineChartData) => item[typeOne]));
      const resultTwo = await getData(startDate, endDate, urlTwo);
      console.log(resultTwo);

      setDataTwo(resultTwo.map((item: LineChartData) => item[typeTwo]));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [getData, startDate, endDate, urlOne, urlTwo, typeOne, typeTwo]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDateChange = (newStartDate: string, newEndDate: string) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <DateRangeSelector
        defaultStartDate={defaultStartDate}
        defaultEndDate={defaultEndDate}
        onChange={handleDateChange}
      />
      <div className="mt-5">
        {loading ? (
          <div className="animate-pulse rounded-lg bg-gray-200 h-64"></div>
        ) : (
          <Line
            className="h-64"
            data={{
              labels: labels,
              datasets: [
                {
                  label: typeOne,
                  data: dataOne,
                  fill: false,
                  borderColor: colors[0],
                  tension: 0.1,
                },
                {
                  label: typeTwo,
                  data: dataTwo,
                  fill: false,
                  borderColor: colors[1],
                  tension: 0.1,
                },
              ],
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MultiLineChart;
