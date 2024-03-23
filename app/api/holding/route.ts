import { BLAZE_GRAPHQL_URI } from "@/constants/trens.constants";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  const { walletAddress } = await request.json();
  const variables = {
    walletAddress: walletAddress,
  };

  const graphqlQuery = `
      query WalletTraits($walletAddress: String!){
          walletTraits(walletAddress: $walletAddress){
              walletAddress
              twitterHandles
              emails
              telegramHandles
              walletTags{
                  cex
                  historical
                  latestActive
              }
              erc20Tokens{
                  chain
                  tokenAddress
                  tokenName
                  tokenSymbol
              }
              erc721Tokens{
                  chain
                  tokenAddress
                  tokenName
                  tokenSymbol
              }
              erc1155Tokens{
                  chain
                  tokenAddress
                  tokenName
                  tokenSymbol
              }
              ethereumTokenPortfolioValue
              polygonTokenPortfolioValue
              nftPortfolioValue
              arbitrumTokenPortfolioValue
              bscTokenPortfolioValue
              baseTokenPortfolioValue
              optimismTokenPortfolioValue
              nftPortfolioValue
              washCategory
              volumeCategory
              activityCategory
              lastTransactionDate
          }
    }
  `;

  try {
    const response = await axios.post(
      BLAZE_GRAPHQL_URI,
      { query: graphqlQuery, variables: variables },
      {
        headers: {
          "x-api-key": `${process.env.GRAPHQL_API_KEY}`,
        },
      }
    );

    if (response.status === 200) {
      return NextResponse.json(response.data);
    } else {
      return NextResponse.json("Error occurred while fetching data", {
        status: response.status,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
