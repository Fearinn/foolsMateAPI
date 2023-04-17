import express from "express";
import { TDataRequest } from "../types/DataRequest.js";
import { paginate } from "../utils/paginate.js";
import { z } from "zod";

export function handlePagination<T extends z.ZodTypeAny>(
  req: TDataRequest<T>,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const data = req.data;

    const typeData = z.custom<T>((value) => value).array();

    const parsedData = typeData.parse(data);

    const { page = 1, limit = 10 } = req.query;

    const parsedPage = z.coerce.number().parse(page);
    const parsedLimit = z.coerce.number().parse(limit);

    const paginatedData = paginate<T>(parsedData, parsedLimit, parsedPage);

    res.status(200).send(paginatedData);
  } catch (err) {
    next(err);
  }
}
