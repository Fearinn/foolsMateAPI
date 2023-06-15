import { z } from "zod";
import { ZId } from "../../common/types/Id.js";
import { ZInteger } from "../../common/types/Integer.js";





export const ZSeason = z.object({
  startTime: z.string(),
  number: ZInteger,
  durationInDays: ZInteger,
  goldPrice: ZInteger,
  goldPricePerReward: ZInteger,
  gemPricePerReward: ZInteger,
  xpPerReward: ZInteger,
  // rewards: ZReward.array(),
  iconUrl: z.string(),
  seasonBackgroundId: ZId,
});

export type Season = z.infer<typeof ZSeason>;
