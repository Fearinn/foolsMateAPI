import express from "express";
import { instance } from "../../services/index.js";
import { ZSeason } from "../../types/Season.js";
import { z } from "zod";

export class SeasonController {
  static getAll = async (
    _: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { data, status } = await instance.get("/battlePass/season");

      const parsedData = ZSeason.parse(data);

      response.status(status).json(parsedData);
    } catch (err) {
      next(err);
    }
  };

  static getByRewardsType = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { data, status } = await instance.get("/battlePass/season");

      const { rewardsTypes = "" } = request.query;

      const parsedData = ZSeason.parse(data);

      const parsedTypes = z.string().parse(rewardsTypes);

      const typesList = parsedTypes.split(":");

      const filteredRewards = parsedData.rewards.filter((reward) =>
        typesList.includes(reward.type)
      );

      const filteredData: z.infer<typeof ZSeason> = {
        ...parsedData,
        rewards: filteredRewards,
      };

      response.status(status).json(filteredData);
    } catch (err) {
      next(err);
    }
  };
}
