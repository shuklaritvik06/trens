import React, { Fragment } from "react";
import LineChart from "./line-chart";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { validateChain } from "@/utils/trens.utils";
import Image from "next/image";
import { redirect, RedirectType } from "next/navigation";
import MultiLineChart from "./multi-line";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChainVisualize = ({ chain }: { chain: string | null }) => {
  if (!validateChain(chain!)) {
    return redirect("/", RedirectType.push);
  }

  const fetchData = async (start: string, end: string, url: string) => {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chain,
          start_date: start,
          end_date: end,
        }),
        signal,
      });

      if (!result.ok) {
        throw new Error("Failed to fetch data");
      }

      const response = await result.json();
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    return () => controller.abort();
  };

  return (
    <Fragment>
      <div className="bg-blue-50 min-h-screen">
        <div className="max-w-[1600px] mx-auto pt-10 p-4">
          <div className="flex items-center gap-4">
            <Image
              src={`/${chain?.toLowerCase()}.png`}
              width={50}
              height={50}
              alt="chain logo"
              className="w-10 h-10 object-contain"
            />
            <h1 className="text-2xl font-bold uppercase">
              {chain?.toUpperCase()} Chain
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            <LineChart
              defaultEndDate="2023-01-07"
              defaultStartDate="2023-01-01"
              getData={fetchData}
              url="/api/active"
              type="active_users"
            />
            <LineChart
              defaultEndDate="2023-01-07"
              defaultStartDate="2023-01-01"
              getData={fetchData}
              url="/api/market"
              type="market_cap"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            <LineChart
              defaultEndDate="2023-01-07"
              defaultStartDate="2023-01-01"
              getData={fetchData}
              url="/api/price"
              type="price"
            />
            <LineChart
              defaultEndDate="2023-01-07"
              defaultStartDate="2023-01-01"
              getData={fetchData}
              url="/api/users"
              type="new_users"
            />
          </div>
          <div className="mt-10">
            <MultiLineChart
              defaultEndDate="2023-01-07"
              defaultStartDate="2023-01-01"
              getData={fetchData}
              urlOne="/api/users"
              urlTwo="/api/transaction"
              typeOne="new_users"
              typeTwo="number_of_transactions"
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ChainVisualize;
