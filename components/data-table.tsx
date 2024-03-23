import React, { FC, useState } from "react";
import DataTable from "react-data-table-component";
import { IHoldings, ErcToken } from "@/types/trens.types";

const TokenDataTable: FC<{ holdings: IHoldings }> = ({ holdings }) => {
  const [selectedToken, setSelectedToken] = useState("erc20");

  const handleTokenChange = (event: any) => {
    setSelectedToken(event.target.value);
  };

  let data: ErcToken[] = [];

  if (selectedToken === "erc20") {
    data = holdings.data.walletTraits.erc20Tokens;
  } else if (selectedToken === "erc721") {
    data = holdings.data.walletTraits.erc721Tokens;
  } else if (selectedToken === "erc1155") {
    data = holdings.data.walletTraits.erc1155Tokens;
  }

  const columns = [
    { name: "Chain", sortable: true, selector: (row: ErcToken) => row.chain },
    {
      name: "Token Address",
      sortable: true,
      selector: (row: ErcToken) => row.tokenAddress,
    },
    {
      name: "Token Name",
      sortable: true,
      selector: (row: ErcToken) => row.tokenName,
    },
    {
      name: "Token Symbol",
      sortable: true,
      selector: (row: ErcToken) => row.tokenSymbol,
    },
  ];
  return (
    <div className="max-w-[1600px] my-6 mx-auto px-3">
      <h2>Token Data Table</h2>
      <select
        title="Select Token"
        value={selectedToken}
        onChange={handleTokenChange}
        className="block w-full px-4 py-2 my-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        <option value="erc20">ERC20 Tokens</option>
        <option value="erc721">ERC721 Tokens</option>
        <option value="erc1155">ERC1155 Tokens</option>
      </select>
      <DataTable
        columns={columns}
        data={data}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 30]}
      />
    </div>
  );
};

export default TokenDataTable;
