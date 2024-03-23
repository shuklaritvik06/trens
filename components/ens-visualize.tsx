"use client";

import { IHoldings } from "@/types/trens.types";
import Link from "next/link";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { ClipLoader } from "react-spinners";
import { RedirectType, redirect } from "next/navigation";
import TokenDataTable from "./data-table";
import WalletTagsComponent from "./tags-ens";

const StatisticCard = ({
  title,
  statistic,
}: {
  title: string;
  statistic: string | undefined;
}) => {
  const isEmpty = !title.trim() || !statistic?.trim();

  if (isEmpty) {
    return null;
  }

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="text-3xl font-bold text-gray-800">{statistic}</div>
      </div>
    </div>
  );
};

const ENSVisualize = ({ ens }: { ens: string | null }) => {
  const [loading, setLoading] = useState(true);
  const [holdings, setHoldings] = useState<IHoldings>();

  const fetchData = useCallback(async () => {
    if (!ens) return;

    setLoading(true);
    try {
      const resolveResponse = await fetch("/api/resolve", {
        method: "POST",
        body: JSON.stringify({
          domain: ens,
        }),
      });

      if (!resolveResponse.ok) {
        throw new Error("Failed to fetch ENS resolve data");
      }

      const resolveData = await resolveResponse.json();
      const walletAddress = resolveData?.address;

      if (!walletAddress) {
        throw new Error(
          "Failed to extract wallet address from ENS resolve data"
        );
      }

      const holdingResponse = await fetch("/api/holding", {
        method: "POST",
        body: JSON.stringify({
          walletAddress: walletAddress,
        }),
      });

      const holdingData = await holdingResponse.json();
      setHoldings(holdingData);
    } catch (error: any) {
      toast.error("Error: " + error.message);
      redirect("/", RedirectType.push);
    } finally {
      setLoading(false);
    }
  }, [ens]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Fragment>
      {loading ? (
        <div className="flex h-screen w-screen justify-center items-center">
          <ClipLoader size={30} color="black" />
        </div>
      ) : (
        <div className="bg-blue-50 h-screen w-screen overflow-x-hidden">
          <div className="max-w-[1600px] mx-auto pt-10 px-3">
            <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
              <div className="text-3xl font-semibold">Hi {ens} 👋</div>
              <div className="flex items-center gap-2">
                {holdings?.data?.walletTraits?.emails?.length! > 0 ? (
                  <Link
                    href={`mailto:${holdings?.data?.walletTraits?.emails?.[0]}`}
                    className="hover:text-gray-800"
                  >
                    <Image src="/mail.png" alt="" width={24} height={24} />
                  </Link>
                ) : null}
                {holdings?.data?.walletTraits?.twitterHandles?.length! > 0 ? (
                  <Link
                    href={`https://twitter.com/${holdings?.data?.walletTraits?.twitterHandles?.[0]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-800"
                  >
                    <Image src="/twitter.png" alt="" width={24} height={24} />
                  </Link>
                ) : null}
                {holdings?.data?.walletTraits?.telegramHandles?.length! > 0 ? (
                  <Link
                    href={`https://t.me/${holdings?.data?.walletTraits?.telegramHandles?.[0]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-800"
                  >
                    <Image src="/telegram.png" alt="" width={24} height={24} />
                  </Link>
                ) : null}
                <div className="bg-white rounded-lg p-2">
                  {holdings?.data?.walletTraits?.walletAddress!}
                </div>
              </div>
            </div>
            <div className="mt-8">
              <div className="flex flex-wrap -mx-4">
                <StatisticCard
                  statistic={`${holdings?.data?.walletTraits?.ethereumTokenPortfolioValue?.toFixed(
                    2
                  )} ETH`}
                  title="Ethereum Token Portfolio Value"
                />
                <StatisticCard
                  statistic={`${holdings?.data?.walletTraits?.polygonTokenPortfolioValue?.toFixed(
                    2
                  )} MATIC`}
                  title="Polygon Token Portfolio Value"
                />
                <StatisticCard
                  statistic={`${holdings?.data?.walletTraits?.nftPortfolioValue?.toFixed(
                    2
                  )} USD`}
                  title="NFT Portfolio Value"
                />
                <StatisticCard
                  statistic={`${holdings?.data?.walletTraits?.arbitrumTokenPortfolioValue?.toFixed(
                    2
                  )} ARB`}
                  title="Arbitrum Token Portfolio Value"
                />
                <StatisticCard
                  statistic={`${holdings?.data?.walletTraits?.bscTokenPortfolioValue?.toFixed(
                    2
                  )} BNB`}
                  title="BSC Token Portfolio Value"
                />
                <StatisticCard
                  statistic={`${holdings?.data?.walletTraits?.baseTokenPortfolioValue?.toFixed(
                    2
                  )} BASE`}
                  title="Base Token Portfolio Value"
                />
                <StatisticCard
                  statistic={`${holdings?.data?.walletTraits?.optimismTokenPortfolioValue?.toFixed(
                    2
                  )} OPT`}
                  title="Optimism Token Portfolio Value"
                />
                <StatisticCard
                  statistic={holdings?.data?.walletTraits?.washCategory}
                  title="Wash Category"
                />
                <StatisticCard
                  statistic={holdings?.data?.walletTraits?.volumeCategory}
                  title="Volume Category"
                />
                <StatisticCard
                  statistic={holdings?.data?.walletTraits?.activityCategory}
                  title="Activity Category"
                />
                <StatisticCard
                  statistic={holdings?.data?.walletTraits?.lastTransactionDate}
                  title="Last Transaction Date"
                />

                <WalletTagsComponent
                  tags={holdings?.data?.walletTraits?.walletTags?.cex!}
                />
                <WalletTagsComponent
                  tags={holdings?.data?.walletTraits?.walletTags?.historical!}
                />
                <WalletTagsComponent
                  tags={holdings?.data?.walletTraits?.walletTags?.latestActive!}
                />
              </div>
            </div>
          </div>
          {holdings && <TokenDataTable holdings={holdings} />}
        </div>
      )}
    </Fragment>
  );
};

export default ENSVisualize;
