import { redirect, useSearchParams } from "next/navigation";
import React from "react";
import ENSVisualize from "./ens-visualize";
import ChainVisualize from "./chain-visualize";

const SearchPage = () => {
  const params = useSearchParams();

  const hasChainParam = params.has("chain");
  const hasQParam = params.has("q");
  const chainParam = params.get("chain");
  const QParam = params.get("q");

  if (!hasChainParam && !hasQParam) {
    return redirect("/");
  }
  return (
    <div>
      {hasChainParam && !hasQParam && <ChainVisualize chain={chainParam} />}
      {hasQParam && !hasChainParam && <ENSVisualize ens={QParam} />}
    </div>
  );
};

export default SearchPage;
