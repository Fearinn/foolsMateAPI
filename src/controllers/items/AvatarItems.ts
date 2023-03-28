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

      const dataPage = paginate<IAvatarItem>({
        filteredData,
        originalData: safeData,
        page,
        itemsPerPage: limit,
      });

      response.status(status).json(dataPage);
    } catch (error) {
      console.log(error);
      response
        .status(500)
        .send("An unexpected error occurred! Please try again later");
    }
  };

  static getByIds = async (
    request: express.Request,
    response: express.Response
  ) => {
    try {
      const axiosResponse = await instance.get("/items/avatarItems");

      if (!axiosResponse || !Array.isArray(axiosResponse.data)) {
        throw new Error("Type of response data don't match the expected type");
      }

      const { data, status } = axiosResponse;

      const ids = request.body.ids;

      const safeIds = filterByType<string>(ids, (id) => typeof id === "string");

      const safeData = filterByType<IAvatarItem>(data, isAvatarItem);

      const selectedItems = safeData.filter((item) =>
        safeIds.includes(item.id)
      );

      if (selectedItems.length <= 0) {
        response
          .status(404)
          .send("No item was found with the given parameters");
        return;
      }

      response.status(status).send(selectedItems);
    } catch (error) {
      response
        .status(500)
        .send("An unexpected error occurred! Please try again later");
    }
  };
}
