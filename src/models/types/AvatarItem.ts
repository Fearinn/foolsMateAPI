import { z } from "zod";
import { ZRarity } from "../../types/Rarity.js";
import { ZRegExp } from "../../types/RegExp.js";
import { ZId } from "../../types/Id.js";

export const ZAvatarItemType = z.enum([
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
]);

export const ZAvatarItemGender = z.enum(["FEMALE", "MALE", "NEUTRAL"]);

export const ZAvatarItem = z.object({
  id: ZId,
  rarity: ZRarity,
  costInGold: z.number().optional(),
  costInRoses: z.number().optional(),
  imageUrl: z.string(),
  type: ZAvatarItemType,
  gender: ZAvatarItemGender.optional(),
  event: ZRegExp.optional(),
});
