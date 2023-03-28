import express from "express";
import { instance } from "../../services/index.js";

export class SeasonController {
  static getAll = async (
    _: express.Request,
    response: express.Response
  ) => {
    try {
      const { data, status } = await instance.get("/battlePass/season");

      response.status(status).json(data);
    } catch (error) {
      console.log(error);
      response
        .status(500)
        .send("An unexpected error occurred! Please try again later");
    }
  };
}
