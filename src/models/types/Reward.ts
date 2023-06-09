import { z } from "zod";
import { ZId } from "../../types/Id.js";
import { ZItem } from "./Item.js";

export const ZRewardBase = z.object({
  amount: z.number(),
  free: z.boolean(),
  itemId: ZId.optional(),
  item: ZItem,
});

export type RewardBase = z.infer<typeof ZRewardBase>;

export const ZReward = z
  .discriminatedUnion("type", [
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
    z
      .object({
        type: z.literal("LOOT_BOX"),
      })
      .merge(ZRewardBase),
  ])
  .transform((reward) => {
    if (reward.item) {
      reward.itemId = undefined;
      return reward;
    }

    for (const key in reward) {
      const typedKey = key as keyof typeof reward;

      if (!reward.itemId && ZId.safeParse(reward[typedKey]).success) {
        reward.itemId = ZId.parse(reward[typedKey]);
      }
    }

    return reward;
  });

export type Reward = z.infer<typeof ZReward>;
