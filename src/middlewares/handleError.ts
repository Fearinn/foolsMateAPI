import { AxiosError } from "axios";
import express from "express";
import { BaseError } from "../utils/errors/BaseError.js";
import { ZodError } from "zod";
import { BadRequest } from "../utils/errors/BadRequest.js";

export function handleError(err: unknown, res: express.Response) {
  console.log(err);
  if (err instanceof AxiosError) {
    new BaseError(err.message, err.response?.status).send(res);
    return;
  }

  if (err instanceof ZodError) {
    const errData = err.format();

    new BadRequest(JSON.stringify(errData)).send(res);
    return;
  }

  if (err instanceof BaseError) {
    err.send(res);
    return;
  }

  new BaseError().send(res);
}
