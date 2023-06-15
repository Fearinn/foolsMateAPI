import mongoose, { SchemaTypes } from "mongoose";
import { Season } from "../types/Season";

const seasonSchema = new mongoose.Schema<Season>({
  startTime: { type: SchemaTypes.String, required: true },
  number: { type: SchemaTypes.Number, required: true },
  durationInDays: { type: SchemaTypes.Number, required: true },
  goldPrice: { type: SchemaTypes.Number, required: true },
  goldPricePerReward: { type: SchemaTypes.Number, required: true },
  gemPricePerReward: { type: SchemaTypes.Number, required: true },
  xpPerReward: { type: SchemaTypes.Number, required: true },
  // rewards: { type: [rewardSchema], required: true },
  iconUrl: { type: SchemaTypes.String, required: true },
  seasonBackgroundId: { type: SchemaTypes.String, required: true },
});

export const SeasonModel = mongoose.model("battlePassSeason", seasonSchema);
