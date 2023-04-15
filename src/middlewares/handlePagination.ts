import express from "express";
import { TDataRequest } from "../types/DataRequest.js";
import { paginate } from "../utils/paginate.js";
import { BadRequest } from "../utils/errors/BadRequest.js";

export function handlePagination<T>(
  req: TDataRequest<T>,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const data = req.data;

    const { page = 1, limit = 5 } = req.query;

    if (!Array.isArray(data)) {
      throw new BadRequest();
    }

    const paginatedData = paginate<T>({ data, itemsPerPage: limit, page });

    res.status(200).send(paginatedData);
  } catch (err) {
    next(err);
  }
}
