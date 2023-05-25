import { z } from "zod";
import { ZId } from "../../types/Id.js";
import { ZInteger } from "../../types/Integer.js";

export const ZRewardType = z.enum([
  "AVATAR_ITEM",
  "ROLE_ICON",
  "ROSE_PACKAGE",
  "GOLD",
  "GEM",
  "EMOJI",
  "ROLE_CARD_ABILITY_EXCHANGE_VOUCHER",
  "LOADING_SCREEN",
  "PROFILE_ICON",
  "LOOT_BOX",
]);

export type RewardType = z.infer<typeof ZRewardType>;

export const ZRewardBase = z.object({
  amount: z.number(),
  free: z.boolean(),
});

export type RewardBase = z.infer<typeof ZRewardBase>;

export const ZReward = z.discriminatedUnion("type", [
  z
    .object({
      type: z.literal("AVATAR_ITEM"),
      avatarItemId: ZId.optional(),
      avatarItemIdMale: ZId.optional(),
      avatarItemIdFemale: ZId.optional(),
    })
    .merge(ZRewardBase),
  z
    .object({
      type: z.literal("ROLE_ICON"),
      roleIconId: ZId,
    })
    .merge(ZRewardBase),
  z
    .object({
      type: z.literal("ROSE_PACKAGE"),
      rosePackageId: ZId,
    })
    .merge(ZRewardBase),
  z
    .object({
      type: z.literal("GOLD"),
    })
    .merge(ZRewardBase),
  z
    .object({
      type: z.literal("GEM"),
    })
    .merge(ZRewardBase),
  z
    .object({
      type: z.literal("EMOJI"),
      emojiId: ZId,
    })
    .merge(ZRewardBase),
  z
    .object({
      type: z.literal("ROLE_CARD_ABILITY_EXCHANGE_VOUCHER"),
    })
    .merge(ZRewardBase),
  z
    .object({
      type: z.literal("LOADING_SCREEN"),
      loadingScreenId: ZId,
    })
    .merge(ZRewardBase),
  z
    .object({
      type: z.literal("PROFILE_ICON"),
      profileIconId: ZId,
    })
    .merge(ZRewardBase),
  z.object({
    type: z.literal("LOOT_BOX"),
  }),
]);

export type Reward = z.infer<typeof ZReward>;

export const ZSeason = z.object({
  startTime: z.string(),
  number: ZInteger,
  durationInDays: ZInteger,
  goldPrice: ZInteger,
  goldPricePerReward: ZInteger,
  gemPricePerReward: ZInteger,
  xpPerReward: ZInteger,
  rewards: ZReward.array(),
  iconUrl: z.string(),
  seasonBackgroundId: ZId,
});

export type Season = z.infer<typeof ZSeason>;
