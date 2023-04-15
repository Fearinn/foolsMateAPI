import express from "express";
import { instance } from "../../services/index.js";
import { IAvatarItem } from "../../types/AvatarItem.js";
import { isRarity } from "../../utils//typeGuards/isRarity.js";
import { dataFilter } from "../../utils/dataFilter.js";
import { filterByType } from "../../utils/filterByType.js";
import { paginate } from "../../utils/pagination.js";
import {
  isAvatarItem,
  isAvatarItemGender,
  isAvatarItemType,
} from "../../utils/typeGuards/isAvatarItems.js";
import { BaseError } from "../../utils/errors/BaseError.js";
import { BadRequest } from "../../utils/errors/BadRequest.js";

export class AvatarItemsController {
  static getAll = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { data, status } = await instance.get("/items/avatarItems");

      if (!Array.isArray(data)) {
        throw new BaseError(
          "Type of response data doesn't match the expected type"
        );
      }

      const {
        limit,
        page,
        gender,
        costInGold,
        costInRoses,
        rarity,
        type,
        event,
      } = request.query;

      const filterBody: Partial<IAvatarItem> = {
        gender: isAvatarItemGender(gender) ? gender : undefined,
        costInGold: Number(costInGold) || undefined,
        costInRoses: Number(costInRoses) || undefined,
        type: isAvatarItemType(type) ? type : undefined,
        rarity: isRarity(rarity) ? rarity : undefined,
        event:
          typeof event === "string"
            ? new RegExp(event.replace(/\s+/g, "_"), "i")
            : undefined,
      };

      const safeData = filterByType<IAvatarItem>(data, isAvatarItem);
      const filteredData = dataFilter<IAvatarItem>(safeData, filterBody);

      const dataPage = paginate<IAvatarItem>({
        data: filteredData,
        page,
        itemsPerPage: limit,
      });

      response.status(status).json(dataPage);
    } catch (err) {
      next(err);
    }
  };

  static getByIds = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { data, status } = await instance.get("/items/avatarItems");

      const { ids = "" } = request.query;

      if (typeof ids !== "string") {
        throw new BadRequest("Bad request");
      }

      if (!Array.isArray(data)) {
        throw new BaseError(
          "Type of response data doesn't match the expected type"
        );
      }

      const idList = ids.split(":");

      const safeData = filterByType<IAvatarItem>(data, isAvatarItem);

      const selectedItems = safeData.filter((item) => idList.includes(item.id));

      if (selectedItems.length <= 0) {
        response
          .status(404)
          .send("No item was found with the given parameters");
        return;
      }

      response.status(status).send(selectedItems);
    } catch (err) {
      next(err);
    }
  };
}
