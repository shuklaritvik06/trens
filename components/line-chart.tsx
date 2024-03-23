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

const LineChart = ({
  getData,
  defaultStartDate,
  defaultEndDate,
  type,
  url,
}: {
  getData: (startDate: string, endDate: string, url: string) => Promise<any>;
  defaultStartDate: string;
  defaultEndDate: string;
  type: string;
  url: string;
}) => {
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const color = useMemo(() => getRandomColor(), []);
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getData(startDate, endDate, url);
      setLabels(result.map((item: LineChartData) => item["date"]));
      setData(result.map((item: LineChartData) => item[type]));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [getData, startDate, endDate, type, url]);

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
            data={{
              labels: labels,
              datasets: [
                {
                  label: type,
                  data: data,
                  fill: false,
                  borderColor: color,
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

export default LineChart;
