import { z } from "zod";
import { ZRarity } from "../../common/types/Rarity.js";
import { ZRegExp } from "../../common/types/RegExp.js";
import { ZId } from "../../common/types/Id.js";
import { ZInteger } from "../../common/types/Integer.js";

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

export type AvatarItemType = z.infer<typeof ZAvatarItemType>;

export const ZAvatarItemGender = z.enum(["FEMALE", "MALE", "NEUTRAL"]);

export type AvatarItemGender = z.infer<typeof ZAvatarItemGender>;

export const ZAvatarItem = z.object({
  id: ZId,
  rarity: ZRarity,
  costInGold: ZInteger.optional(),
  costInRoses: ZInteger.optional(),
  imageUrl: z.string(),
  type: ZAvatarItemType,
  gender: ZAvatarItemGender.optional(),
  event: ZRegExp.optional(),
});

export type AvatarItem = z.infer<typeof ZAvatarItem>;
