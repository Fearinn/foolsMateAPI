import { z } from "zod";

export const ZRarity = z.enum(["COMMON", "RARE", "EPIC", "LEGENDARY"]);
