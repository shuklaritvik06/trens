"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";

const HomePage = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [selectedChain, setSelectedChain] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (loading) return;

    setLoading(true);

    if (searchValue && selectedChain) {
      toast.error("Please select only one option");
    } else if (searchValue) {
      router.push(`/search?q=${searchValue}`);
    } else if (selectedChain) {
      router.push(`/search?chain=${selectedChain}`);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-yellow-100 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-8 text-black">ENS Visualizer</h1>
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-4">
        <input
          type="text"
          placeholder="Type ENS here to visualize..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-blue-500"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <p className="text-gray-600 mb-2">
          Or you can choose from the chains below to visualize native tokens
        </p>
        <select
          title="Chain to visualize"
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-blue-500"
          value={selectedChain}
          onChange={(e) => setSelectedChain(e.target.value)}
        >
          <option value="">Select Chain</option>
          <option value="ETHEREUM">ETHEREUM</option>
          <option value="ARBITRUM">ARBITRUM</option>
          <option value="BSC">BSC</option>
          <option value="OPTIMISM">OPTIMISM</option>
          <option value="BASE">BASE</option>
          <option value="POLYGON">POLYGON</option>
        </select>
        <button
          className={`bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 w-full transition-colors duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? (
            <ClipLoader color="#ffffff" loading={loading} size={20} />
          ) : (
            "Search"
          )}
        </button>
      </div>
    </div>
  );
};

export default HomePage;
