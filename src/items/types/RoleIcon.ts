import { z } from "zod";
import { ZId } from "../../common/types/Id.js";
import { ZImage } from "../../common/types/Image.js";
import { ZRarity } from "../../common/types/Rarity.js";
import { ZRegExp } from "../../common/types/RegExp.js";

export const ZRoleIcon = z.object({
  id: ZId,
  rarity: ZRarity,
  image: ZImage,
  roleId: ZRegExp,
  event: ZRegExp.optional(),
});

export type RoleIcon = z.infer<typeof ZRoleIcon>;
