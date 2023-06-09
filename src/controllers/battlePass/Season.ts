import express from "express";
import { SeasonModel } from "../../models/Season.js";
import { ZSeason } from "../../models/types/Season.js";
import { instance } from "../../services/index.js";
import { BaseError } from "../../utils/errors/BaseError.js";

export class SeasonController {
  static getAll = async (
    _: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const data = await SeasonModel.findOne({});

      const parsedData = ZSeason.parse(data);

      res.status(200).send(parsedData);
    } catch (err) {
      next(err);
    }
  };

  static updateAll = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { data } = await instance.get("/battlePass/season");

      const { Authorization } = req.headers;

      if (Authorization === process.env["UPDATE_AUTHORIZATION"]) {
        throw new BaseError("Access unauthorized", 401);
      }

      const parsedData = ZSeason.parse(data);

      const result = await SeasonModel.updateOne(
        {},
        { $set: parsedData },
        { upsert: true }
      );

      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };
}
