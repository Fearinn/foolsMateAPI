import express from "express";

export function trimQuery(
  req: express.Request,
  _: express.Response,
  next: express.NextFunction
) {
  try {
    for (const field in req.query) {
      const value = req.query[field];
      req.query[field] = typeof value === "string" ? value.trim() : value;
    }

    next();
  } catch (err) {
    next(err);
  }
}
