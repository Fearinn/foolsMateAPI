import express from "express";
import { z } from "zod";
import { DataRequest } from "../types/DataRequest.js";
import { paginateSimply } from "../utils/paginateSimply.js";

export async function handleSimplePagination<T extends z.ZodTypeAny>(
  req: DataRequest<T>,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const data = req.data;

    if (!z.unknown().array().safeParse(data).success) {
      next();
      return;
    }

    const parsedArray = z.unknown().array().parse(data);

    const { page = 1, limit = 10 } = req.query;

    const parsedPage = z.coerce.number().parse(page);
    const parsedLimit = z.coerce.number().parse(limit);

    const paginatedAsArray = paginateSimply(
      parsedArray,
      parsedPage,
      parsedLimit
    );

    res.status(200).send(paginatedAsArray);
  } catch (err) {
    next(err);
  }
}
