import { AxiosError } from "axios";
import express from "express";
import { ZodError } from "zod";
import { BaseError } from "../utils/errors/BaseError.js";

export function handleError(err: unknown, res: express.Response) {
  console.log(err);
  if (err instanceof AxiosError) {
    new BaseError(err.message, err.response?.status).send(res);
    return;
  }

  if (err instanceof ZodError) {
    new BaseError(JSON.stringify(err.issues)).send(res);
    return;
  }

  if (err instanceof BaseError) {
    err.send(res);
    return;
  }

  new BaseError().send(res);
}
