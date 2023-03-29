import express from "express";
import { instance } from "../../services/index.js";
import { isSeason } from "../../utils/typeGuards/isSeason.js";

export class SeasonController {
  static getAll = async (_: express.Request, response: express.Response) => {
    try {
      const { data, status } = await instance.get("/battlePass/season");

      if (!isSeason(data)) {
        throw new Error("Type of response data don't match the expected type");
      }

      response.status(status).json(data);
    } catch (error) {
      console.log(error);
      response
        .status(500)
        .send("An unexpected error occurred! Please try again later");
    }
  };
}
