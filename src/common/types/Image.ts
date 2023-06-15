import { z } from "zod";

export const ZImage = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
});

export type Image = z.infer<typeof ZImage>;
