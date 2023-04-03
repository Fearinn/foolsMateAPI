import express from "express";
import { instance } from "../../services/index.js";
import { IRewardType, ISeason } from "../../types/Season.js";
import { filterByType } from "../../utils/filterByType.js";
import { isRewardType, isSeason } from "../../utils/typeGuards/isSeason.js";

export class SeasonController {
  static getAll = async (_: express.Request, response: express.Response) => {
    try {
      const { data, status } = await instance.get("/battlePass/season");

      if (!isSeason(data)) {
        throw new Error("Type of response data doesn't match the expected type");
      }

      response.status(status).json(data);
    } catch (error) {
      console.log(error);
      response
        .status(500)
        .send("An unexpected error occurred! Please try again later");
    }
  };

  static getByRewardsType = async (
    request: express.Request,
    response: express.Response
  ) => {
    try {
      const { data, status } = await instance.get("/battlePass/season");

      if (!isSeason(data)) {
        throw new Error("Type of response data doesn't match the expected type");
      }

      const rewardsTypes = request.body.types;
      const safeRewardsTypes = filterByType<IRewardType>(
        rewardsTypes,
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
    } catch (error) {
      console.log(error);
      response
        .status(500)
        .send("An unexpected error occurred! Please try again later");
    }
  };
}
