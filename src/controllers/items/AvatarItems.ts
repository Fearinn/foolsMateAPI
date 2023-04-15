import express from "express";
import { instance } from "../../services/index.js";
import { IAvatarItem } from "../../types/AvatarItem.js";
import { isRarity } from "../../utils//typeGuards/isRarity.js";
import { dataFilter } from "../../utils/dataFilter.js";
import { filterByType } from "../../utils/filterByType.js";
import {
  isAvatarItem,
  isAvatarItemGender,
  isAvatarItemType,
} from "../../utils/typeGuards/isAvatarItems.js";
import { BaseError } from "../../utils/errors/BaseError.js";
import { BadRequest } from "../../utils/errors/BadRequest.js";
import { TDataRequest } from "../../types/DataRequest.js";
import { NotFound } from "../../utils/errors/NotFound.js";

export class AvatarItemsController {
  static getAll = async (
    request: TDataRequest<IAvatarItem>,
    _: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { data } = await instance.get("/items/avatarItems");

      if (!Array.isArray(data)) {
        throw new BaseError(
          "Type of response data doesn't match the expected type"
        );
      }

      const { gender, costInGold, costInRoses, rarity, type, event } =
        request.query;

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

      request.data = filteredData;

      next();
    } catch (err) {
      next(err);
    }
  };

  static getByIds = async (
    request: TDataRequest<IAvatarItem>,
    _: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { data } = await instance.get("/items/avatarItems");

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
        throw new NotFound("avatar item");
      }

      request.data = selectedItems;
      next();
    } catch (err) {
      next(err);
    }
  };
}
