import { z } from "zod";
import { ZId } from "../../types/Id.js";
import { ZImage } from "../../types/Image.js";
import { ZRarity } from "../../types/Rarity.js";
import { ZRegExp } from "../../types/RegExp.js";

export const ZRoleIcon = z.object({
  id: ZId,
  rarity: ZRarity,
  image: ZImage,
  roleId: ZRegExp,
  event: ZRegExp.optional(),
});
