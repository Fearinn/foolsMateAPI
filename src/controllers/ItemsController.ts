import instance from "../services/index.js";
import express from "express";
import pagination from "../utils/pagination.js";
import {
  isAvatarItem,
  isAvatarItemGender,
  isAvatarItemRarity,
  isAvatarItemType,
} from "../utils/isAvatarItems.js";
import dataFilter from "../utils/dataFilter.js";
import IAvatarItem from "../types/AvatarItem.js";
import filterByType from "../utils/filterByType.js";
import { isAvatarIcon } from "../utils/isAvatarIcon.js";
import IRoleIcon from "../types/RoleIcons.js";

class AvatarItemsController {
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
      const constInRoses = request.query.gold;
      const rarity = request.query.rarity;
      const type = request.query.type;
      const event = request.query.event;

      const filterBody = {
        gender: isAvatarItemGender(gender) ? gender : undefined,
        costInGold: Number(costInGold) || undefined,
        constInRoses: Number(constInRoses) || undefined,
        type: isAvatarItemType(type) ? type : undefined,
        rarity: isAvatarItemRarity(rarity) ? rarity : undefined,
        event:
          typeof event === "string"
            ? new RegExp(event.replace(/\s+/g, "_"), "i")
            : undefined,
      };

      const safeData = filterByType<IAvatarItem>(data, isAvatarItem);
      const filteredData = dataFilter<IAvatarItem>(safeData, filterBody);

      const dataPage = pagination<IAvatarItem>(
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

class RoleIconsController {
  static getAll = async (
    request: express.Request,
    response: express.Response
  ) => {
    try {
      const { data, status } = await instance.get("/items/");

      if (!Array.isArray(data)) {
        throw new Error("Type of response data don't match the expected type");
      }

      const limit = request.query.limit;
      const page = request.query.page;

      const safeData = filterByType<IRoleIcon>(data, isAvatarIcon);
      const filteredData = dataFilter<IRoleIcon>(safeData, {});

      const dataPage = pagination<IRoleIcon>(
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

export { AvatarItemsController, RoleIconsController };
