import express from "express";
import { SeasonModel } from "../models/Season.js";
import { instance } from "../../common/services/index.js";
import { BaseError } from "../../common/utils/errors/BaseError.js";
import { ZSeason } from "../types/Season.js";

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

      const { authorization } = req.headers;

      if (authorization !== process.env["UPDATE_AUTHORIZATION"]) {
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
