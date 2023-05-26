import { z } from "zod";
import { ZInteger } from "../../types/Integer.js";

export const ZCategory = z.enum(["EASY", "NORMAL", "HARD"]);

export const ZStatus = z.enum(["DEFAULT", "DND", "OFFLINE", "PLAY"]);

const ZAvatar = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
});

const ZGameStats = z.object({
  totalWinCount: ZInteger,
  totalLoseCount: ZInteger,
  totalTieCount: ZInteger,
  villageWinCount: ZInteger,
  villageLoseCount: ZInteger,
  werewolfWinCount: ZInteger,
  werewolfLoseCount: ZInteger,
  votingWinCount: ZInteger,
  votingLoseCount: ZInteger,
  soloWinCount: ZInteger,
  soloLoseCount: ZInteger,
  exitGameBySuicideCount: ZInteger,
  exitGameAfterDeathCount: ZInteger,
  gamesSurvivedCount: ZInteger,
  gamesKilledCount: ZInteger,
  totalPlayTimeInMinutes: ZInteger,
});

export const ZPlayer = z.object({
  id: z.string(),
  username: z.string(),
  level: ZInteger,
  creationTime: z.string().optional(),
  clanId: z.string().optional(),
  rankedSeasonSkill: ZInteger.optional(),
  rankedSeasonMaxSkill: ZInteger.optional(),
  rankedSeasonBestRank: ZInteger.optional(),
  rankedSeasonPlayedCount: ZInteger.optional(),
  equippedAvatar: ZAvatar,
  avatars: ZAvatar.array().optional(),
  gameStats: ZGameStats.optional(),
});

export type Player = z.infer<typeof ZPlayer>;
