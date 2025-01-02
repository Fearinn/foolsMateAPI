import mongoose, { SchemaTypes } from "mongoose";
import { z } from "zod";
import { Reward } from "../types/Reward";

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
  "BATTLE_PASS_COIN",
  "BODY_PAINT",
]);

export type RewardType = z.infer<typeof ZRewardType>;

const rewardSchema = new mongoose.Schema<Reward>(
  {
    itemId: {
      type: SchemaTypes.String,
      index: true,
    },
    type: {
      type: SchemaTypes.String,
      required: true,
      enum: ZRewardType._def.values,
    },
    avatarItemId: {
      type: SchemaTypes.String,
    },
    avatarItemIdMale: {
      type: SchemaTypes.String,
    },
    avatarItemIdFemale: {
      type: SchemaTypes.String,
    },
    roleIconId: {
      type: SchemaTypes.String,
    },
    rosePackageId: {
      type: SchemaTypes.String,
    },
    emojiId: {
      type: SchemaTypes.String,
    },
    loadingScreenId: {
      type: SchemaTypes.String,
    },
    profileIconId: {
      type: SchemaTypes.String,
    },
    amount: {
      type: SchemaTypes.Number,
      required: true,
    },
    free: {
      type: SchemaTypes.Boolean,
      required: true,
    },
  },
  { toJSON: { virtuals: true } }
);

rewardSchema.virtual("item", {
  ref: "Item",
  localField: "itemId",
  foreignField: "id",
  justOne: true,
});

export const RewardModel = mongoose.model("Reward", rewardSchema);
