import express from "express";
import { NotFound } from "../utils/errors/NotFound.js";

export function handlePage404(next: express.NextFunction) {
  next(new NotFound());
}
