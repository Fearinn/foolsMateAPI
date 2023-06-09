import express from "express";
import { RewardModel } from "../../models/Reward.js";
import { ZReward } from "../../models/types/Reward.js";
import { instance } from "../../services/index.js";
import { BaseError } from "../../utils/errors/BaseError.js";

export class RewardController {
  static getAll = async (
    _: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const data = await RewardModel.find({}).populate({ path: "item" }).exec();

      const parsedData = ZReward.array().parse(data);

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
      const { data } = await instance.get<{ rewards: unknown }>(
        "/battlePass/season"
      );

      const { Authorization } = req.headers;

      if (Authorization === process.env["UPDATE_AUTHORIZATION"]) {
        throw new BaseError("Access unauthorized", 401);
      }

      const parsedRewards = ZReward.array().parse(data.rewards);

      await RewardModel.deleteMany({});

      const result = await RewardModel.insertMany(parsedRewards);

      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };
}
