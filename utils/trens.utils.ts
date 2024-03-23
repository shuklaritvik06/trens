const validChains = [
  "ETHEREUM",
  "ARBITRUM",
  "BSC",
  "OPTIMISM",
  "BASE",
  "POLYGON",
];

export const validateChain = (chain: string): boolean => {
  return validChains.includes(chain.toUpperCase());
};

export const validateDate = (date: string): boolean => {
  return !isNaN(Date.parse(date));
};
