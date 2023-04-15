import express from "express";
import { instance } from "../../services/index.js";
import { IRewardType, ISeason } from "../../types/Season.js";
import { filterByType } from "../../utils/filterByType.js";
import { isRewardType, isSeason } from "../../utils/typeGuards/isSeason.js";
import { BaseError } from "../../utils/errors/BaseError.js";
import { BadRequest } from "../../utils/errors/BadRequest.js";

export class SeasonController {
  static getAll = async (
    _: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { data, status } = await instance.get("/battlePass/season");

      if (!isSeason(data)) {
        throw new BaseError(
          "Type of response data doesn't match the expected type"
        );
      }

      response.status(status).json(data);
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

      if (typeof rewardsTypes !== "string") {
        throw new BadRequest();
      }

      if (!isSeason(data)) {
        throw new BaseError(
          "Type of response data doesn't match the expected type"
        );
      }

      const typesList = rewardsTypes.split(":");

      const safeRewardsTypes = filterByType<IRewardType>(
        typesList,
        isRewardType
      );

      const filteredRewards = data.rewards.filter((reward) =>
        safeRewardsTypes.includes(reward.type)
      );

      const filteredData: ISeason = {
        ...data,
        rewards: filteredRewards,
      };

      response.status(status).json(filteredData);
    } catch (err) {
      next(err);
    }
  };
}
