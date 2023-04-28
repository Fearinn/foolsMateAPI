import { z } from "zod";
import { ZRarity } from "./Rarity.js";
import { ZImage } from "./Image.js";
import { ZRegExp } from "./RegExp.js";
import { ZId } from "./Id.js";

export const ZRoleIcon = z.object({
  id: ZId,
  rarity: ZRarity,
  image: ZImage,
  roleId: ZRegExp,
  event: ZRegExp.optional(),
});
