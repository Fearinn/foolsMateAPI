import { z } from "zod";
import express from "express";

export function generateDataRequest<T extends z.ZodTypeAny>(schema: T) {
  return z.object({
    data: z.array(schema).optional(),
  });
}

export type TDataRequest<T extends z.ZodTypeAny> = z.infer<
  ReturnType<typeof generateDataRequest<T>>
> &
  express.Request;
