import mongoose from "mongoose";
import { Background } from "./types/Background";

const imageSchema = {
  url: mongoose.Schema.Types.String,
  width: mongoose.Schema.Types.Number,
  height: mongoose.Schema.Types.Number,
};

const backgroundSchema = new mongoose.Schema<Background>({
  id: {
    type: mongoose.Schema.Types.String,
    index: true,
    required: true,
  },
  rarity: {
    type: mongoose.Schema.Types.String,
    enum: ["COMMON", "RARE", "EPIC", "LEGENDARY"],
    required: true,
  },
  imageDay: {
    type: imageSchema,
    required: true,
  },
  imageDayWide: {
    type: imageSchema,
    required: true,
  },
  imageDaySmall: {
    type: imageSchema,
    required: true,
  },
  imageNight: {
    type: imageSchema,
    required: true,
  },
  imageNightWide: {
    type: imageSchema,
    required: true,
  },
  imageNightSmall: {
    type: imageSchema,
    required: true,
  },
  backgroundColorDay: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  backgroundColorNight: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  event: mongoose.Schema.Types.String,
});

export const BackgroundModel = mongoose.model("backgrounds", backgroundSchema);
