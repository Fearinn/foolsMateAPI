import express from "express";
import mongoose from "mongoose";
import { z } from "zod";
import { AggregateResponse, AggregateRequest } from "../types/Aggregate.js";
import { paginateDb } from "../utils/paginateDb.js";

export async function handleDbPagination(
  req: AggregateRequest<AggregateResponse>,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const data = req.data;

    const aggregateValidator = z.instanceof(
      mongoose.Aggregate<AggregateResponse>
    );

    if (!aggregateValidator.safeParse(data).success) {
      next();
      return
    }

    const parsedData = aggregateValidator.parse(data);

    const { page = 1, limit = 10 } = req.query;

    const parsedPage = z.coerce.number().parse(page);
    const parsedLimit = z.coerce.number().parse(limit);

    const paginatedData = await paginateDb(parsedData, parsedPage, parsedLimit);

    res.status(200).send(paginatedData);
  } catch (err) {
    next(err);
  }
}
