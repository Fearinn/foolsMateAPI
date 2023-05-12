import { z } from "zod";
import { ZId } from "../../types/Id.js";
import { ZImage } from "../../types/Image.js";
import { ZRarity } from "../../types/Rarity.js";

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

export type Background = z.infer<typeof ZBackground>;
