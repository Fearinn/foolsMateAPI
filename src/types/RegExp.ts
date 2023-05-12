import { z } from "zod";

export const ZRegExp = z.instanceof(RegExp).or(z.string());

export type RegExp = z.infer<typeof ZRegExp>;
