import { z } from "zod";

export const ZId = z.string().min(3);
