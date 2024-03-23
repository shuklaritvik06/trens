import { WalletTagsProps } from "@/types/trens.types";
import React, { FC } from "react";

const WalletTagsComponent: FC<WalletTagsProps> = ({ tags }) => {
  const colorClasses = [
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-purple-500",
    "bg-indigo-500",
    "bg-red-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-cyan-500",
  ];

  if (tags.length === 0) {
    return null;
  }
  return (
    <div className="flex flex-wrap gap-4 mt-4 px-3">
      {tags.map((tag, index) => (
        <span
          key={index}
          className={`px-2 py-1 rounded-md text-sm text-white ${
            colorClasses[index % colorClasses.length]
          }`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default WalletTagsComponent;
