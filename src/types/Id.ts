import { z } from "zod";

export const ZId = z.string().min(3);

export type Id = z.infer<typeof ZId>;
