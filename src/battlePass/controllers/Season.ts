import express from "express";
import { instance } from "../../common/services/index.js";
import { ZSeason } from "../types/Season.js";

export class SeasonController {
  static getAll = async (
    _: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { data } = await instance.get("/battlePass/season");

      const parsedData = ZSeason.parse(data);

      res.status(200).send(parsedData);
    } catch (err) {
      next(err);
    }
  };
}
