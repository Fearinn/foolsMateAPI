import { z } from "zod";

export const ZRarity = z.enum(["COMMON", "RARE", "EPIC", "LEGENDARY"]);

export type Rarity = z.infer<typeof ZRarity>;
