import mongoose, { SchemaTypes } from "mongoose";
import { z } from "zod";
import { ZReward, ZRewardType, ZSeason } from "../types/Season.js";

const rewardSchema = new mongoose.Schema<z.infer<typeof ZReward>>({
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
});

const seasonSchema = new mongoose.Schema<z.infer<typeof ZSeason>>({
  startTime: { type: SchemaTypes.String, required: true },
  number: { type: SchemaTypes.Number, required: true },
  durationInDays: { type: SchemaTypes.Number, required: true },
  goldPrice: { type: SchemaTypes.Number, required: true },
  goldPricePerReward: { type: SchemaTypes.Number, required: true },
  gemPricePerReward: { type: SchemaTypes.Number, required: true },
  xpPerReward: { type: SchemaTypes.Number, required: true },
  rewards: { type: [rewardSchema], required: true },
  iconUrl: { type: SchemaTypes.String, required: true },
  seasonBackgroundId: { type: SchemaTypes.String, required: true },
});

export const SeasonModel = mongoose.model("battlePassSeason", seasonSchema);
