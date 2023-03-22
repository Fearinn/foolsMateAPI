import express from "express";
import instance from "../../services/index.js";
import IAvatarItem from "../../types/AvatarItem.js";
import { dataFilter } from "../../utils/dataFilter.js";
import { filterByType } from "../../utils/filterByType.js";
import {
  isAvatarItem,
  isAvatarItemGender,
  isAvatarItemType,
} from "../../utils/isAvatarItems.js";
import { isRarity } from "../../utils/isRarity.js";
import { paginate } from "../../utils/pagination.js";

export class AvatarItemsController {
  static getAll = async (
    request: express.Request,
    response: express.Response
  ) => {
    try {
      const { data, status } = await instance.get("/items/avatarItems");

      if (!Array.isArray(data)) {
        throw new Error("Type of response data don't match the expected type");
      }

      const limit = request.query.limit;
      const page = request.query.page;
      const gender = request.query.gender;
      const costInGold = request.query.gold;
      const constInRoses = request.query.roses;
      const rarity = request.query.rarity;
      const type = request.query.type;
      const event = request.query.event;

      const filterBody: Partial<IAvatarItem> = {
        gender: isAvatarItemGender(gender) ? gender : undefined,
        costInGold: Number(costInGold) || undefined,
        costInRoses: Number(constInRoses) || undefined,
        type: isAvatarItemType(type) ? type : undefined,
        rarity: isRarity(rarity) ? rarity : undefined,
        event:
          typeof event === "string"
            ? new RegExp(event.replace(/\s+/g, "_"), "i")
            : undefined,
      };

      const safeData = filterByType<IAvatarItem>(data, isAvatarItem);
      const filteredData = dataFilter<IAvatarItem>(safeData, filterBody);

      const dataPage = paginate<IAvatarItem>(
        filteredData,
        safeData,
        page,
        limit
      );

      response.status(status).json(dataPage);
    } catch (error) {
      console.log(error);
      response
        .status(501)
        .send("An unexpected error occurred! Please try again later");
    }
  };
}
