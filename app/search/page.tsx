"use client";

import SearchPage from "@/components/search-page";
import { Suspense } from "react";

const SearchENS = () => {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
};

export default SearchENS;
