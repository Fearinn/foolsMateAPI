import { z } from "zod";
import { ZImage } from "../../common/types/Image.js";

export const ZAura = z.enum(["GOOD", "EVIL", "UNKNOWN"]);

export const ZRole = z
  .object({
    id: z.string(),
    team: z.string(),
    aura: ZAura,
    name: z.string(),
    description: z.string(),
    image: ZImage,
    advancedRoles: z.string().array().optional(),
    possibleRoles: z.string().array().optional(),
  })
  .transform((role) => {
    if (
      role.team !== "VILLAGER" &&
      role.team !== "WEREWOLF" &&
      !role.team.includes("RANDOM")
    )
      role.team = "SOLO";

    if (role.team.includes("RANDOM")) role.team = "RANDOM";

    return role;
  });

export type Role = z.infer<typeof ZRole>;
