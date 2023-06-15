import mongoose, { SchemaTypes } from "mongoose";
import { ZRarity } from "../../common/types/Rarity.js";
import { AvatarItem, ZAvatarItemType } from "../types/AvatarItem.js";

const avatarItemSchema = new mongoose.Schema<AvatarItem>({
  id: {
    type: SchemaTypes.String,
    required: true,
    index: true,
  },
  rarity: {
    type: SchemaTypes.String,
    enum: ZRarity._def.values,
    required: true,
  },
  imageUrl: {
    type: SchemaTypes.String,
    required: true,
  },
  type: {
    type: SchemaTypes.String,
    enum: ZAvatarItemType._def.values,
    required: true,
  },
  gender: {
    type: SchemaTypes.String,
    enum: ZAvatarItemType._def.values,
    default: "NEUTRAL",
  },
  costInGold: {
    type: SchemaTypes.Number,
  },
  costInRoses: {
    type: SchemaTypes.Number,
  },
  event: {
    type: SchemaTypes.String,
  },
});

export const AvatarItemModel = mongoose.model("avatarItems", avatarItemSchema);
