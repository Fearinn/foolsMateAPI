import { z } from "zod";
import { ZRarity } from "./Rarity.js";
import { ZImage } from "./Image.js";
import { ZId } from "./ZId.js";

export const ZBackground = z.object({
  id: ZId,
  rarity: ZRarity,
  imageDay: ZImage,
  imageDayWide: ZImage,
  imageDaySmall: ZImage,
  backgroundColorDay: z.string(),
  backgroundColorNight: z.string(),
  event: z.string().optional(),
});
