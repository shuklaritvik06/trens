export interface IHoldings {
  data: Data;
}

export interface Data {
  walletTraits: WalletTraits;
}

export interface WalletTraits {
  walletAddress: string;
  twitterHandles: string[];
  emails: string[];
  telegramHandles: any[];
  walletTags: WalletTags;
  ethereumTokenPortfolioValue: number;
  polygonTokenPortfolioValue: number;
  nftPortfolioValue: number;
  arbitrumTokenPortfolioValue: number;
  bscTokenPortfolioValue: number;
  baseTokenPortfolioValue: number;
  optimismTokenPortfolioValue: number;
  washCategory: string;
  volumeCategory: string;
  activityCategory: string;
  lastTransactionDate: string;
  erc20Tokens: ErcToken[];
  erc721Tokens: ErcToken[];
  erc1155Tokens: ErcToken[];
}

export interface WalletTags {
  cex: string[];
  historical: string[];
  latestActive: string[];
}

export interface ErcToken {
  chain: string;
  tokenAddress: string;
  tokenName: string;
  tokenSymbol: string;
}

export interface WalletTagsProps {
  tags: string[];
}

export interface LineChartData {
  [key: string]: string;
}
