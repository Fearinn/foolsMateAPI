import express from "express";

export class BaseError extends Error {
  message: string;
  status: number;
  constructor(message = "Internal server error", status = 500) {
    super();
    this.message = message;
    this.status = status;
  }

  send = (response: express.Response) => {
    response
      .status(this.status)
      .send({ message: this.message, status: this.status });
  };
}
