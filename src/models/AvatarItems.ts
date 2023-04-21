import mongoose from "mongoose";
import { ZAvatarItem } from "../types/AvatarItem";
import { z } from "zod";

const avatarItemSchema = new mongoose.Schema<z.infer<typeof ZAvatarItem>>({
  id: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  rarity: {
    type: mongoose.Schema.Types.String,
    enum: ["COMMON", "RARE", "EPIC", "LEGENDARY"],
    required: true,
  },
  imageUrl: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  type: {
    type: mongoose.Schema.Types.String,
    enum: [
      "HAIR",
      "FRONT",
      "SHIRT",
      "HAT",
      "GLASSES",
      "BACK",
      "MASK",
      "GRAVESTONE",
      "MOUTH",
      "EYES",
      "BADGE",
    ],
    required: true,
  },
  gender: {
    type: mongoose.Schema.Types.String,
    enum: ["FEMALE", "MALE"],
  },
  costInGold: {
    type: mongoose.Schema.Types.Number,
  },
  costInRoses: {
    type: mongoose.Schema.Types.Number,
  },
  event: {
    type: mongoose.Schema.Types.String,
  },
});

export const AvatarItemModel = mongoose.model("avatarItems", avatarItemSchema);
