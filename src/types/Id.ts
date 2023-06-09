import { z } from "zod";

export const ZId = z.string().length(3);

export type Id = z.infer<typeof ZId>;
