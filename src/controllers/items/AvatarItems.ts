import express from "express";
import { z } from "zod";
import { instance } from "../../services/index.js";
import {
  ZAvatarItem,
  ZAvatarItemGender,
  ZAvatarItemType,
} from "../../types/AvatarItem.js";
import { TDataRequest } from "../../types/DataRequest.js";
import { ZRarity } from "../../types/Rarity.js";
import { dataFilter } from "../../utils/dataFilter.js";
import { ZId } from "../../types/ZId.js";

const partialItem = ZAvatarItem.partial();

export class AvatarItemsController {
  static getAll = async (
    request: TDataRequest<typeof partialItem>,
    _: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { data } = await instance.get("/items/avatarItems");

      const parsedData = ZAvatarItem.array().parse(data);

      const { gender, costInGold, costInRoses, rarity, type, event } =
        request.query;

      const filterBody = {
        gender: ZAvatarItemGender.optional().parse(gender),
        costInGold: z.number().optional().parse(costInGold),
        costInRoses: z.number().optional().parse(costInRoses),
        type: ZAvatarItemType.optional().parse(type),
        rarity: ZRarity.optional().parse(rarity),
        event: z.string().optional().parse(event),
      };

      const filteredData = dataFilter<Partial<z.infer<typeof ZAvatarItem>>>(
        parsedData,
        filterBody
      );

      request.data = filteredData;

      next();
    } catch (err) {
      next(err);
    }
  };

  static getByIds = async (
    request: TDataRequest<typeof ZAvatarItem>,
    _: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { data } = await instance.get("/items/avatarItems");

      const { ids = "" } = request.query;

      const parsedData = ZAvatarItem.array().parse(data);

      const parsedIds = ZId.parse(ids);

      const idList = parsedIds.split(":");

      const selectedItems = parsedData.filter((item) =>
        idList.includes(item.id)
      );

      request.data = selectedItems;
      next();
    } catch (err) {
      next(err);
    }
  };
}
