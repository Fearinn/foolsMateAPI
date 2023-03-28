export type IBattlePassSeaon = {
  startTime: string;
  number: number;
  durationInDays: number;
  goldPrice: number;
  goldPricePerReward: number;
  gemPricePerReward: number;
  xpPerReward: number;
  rewards: IRewards[];
  iconUrl: string;
  seasonBackgroundId: string;
};

type IRewards = {
  type: string;
  amount: number;
  free: boolean;
};