import { z } from "zod";
import { ZRarity } from "./Rarity.js";
import { ZImage } from "./Image.js";
import { ZId } from "./Id.js";

export const ZBackground = z.object({
  id: ZId,
  rarity: ZRarity,
  imageDay: ZImage,
  imageDayWide: ZImage,
  imageDaySmall: ZImage,
  imageNight: ZImage,
  imageNightWide: ZImage,
  imageNightSmall: ZImage,
  backgroundColorDay: z.string(),
  backgroundColorNight: z.string(),
  event: z.string().optional(),
});
