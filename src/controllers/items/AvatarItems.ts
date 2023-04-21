import express from "express";
import mongoose from "mongoose";
import { z } from "zod";
import { AvatarItemModel } from "../../models/AvatarItems.js";
import { instance } from "../../services/index.js";
import { TAggregateRequest } from "../../types/Aggregate.js";
import {
  ZAvatarItem,
  ZAvatarItemGender,
  ZAvatarItemType,
} from "../../types/AvatarItem.js";
import { TDataRequest } from "../../types/DataRequest.js";
import { ZId } from "../../types/Id.js";
import { ZRarity } from "../../types/Rarity.js";

const partialItem = ZAvatarItem.partial();

export class AvatarItemsController {
  static getAll = async (
    request: TAggregateRequest<z.infer<typeof partialItem>>,
    _: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const {
        gender = null,
        rarity = null,
        type = null,
        event = null,
      } = request.query;

      const parsedEvent = z
        .string()
        .nullable()
        .parse(event)
        ?.replace(/\s+/gi, "_");

      const filterBody: mongoose.FilterQuery<z.infer<typeof partialItem>> = {};

      if (gender) filterBody.gender = ZAvatarItemGender.parse(gender);
      if (rarity) filterBody.rarity = ZRarity.parse(rarity);
      if (type) filterBody.type = ZAvatarItemType.parse(type);
      if (parsedEvent)
        filterBody.event = { $regex: parsedEvent, $options: "im" };

      const data = AvatarItemModel.aggregate<z.infer<typeof ZAvatarItem>>([
        {
          $match: filterBody,
        },
      ]);

      const parsedData = z
        .instanceof(mongoose.Aggregate<z.infer<typeof partialItem>>)
        .parse(data);

      request.data = parsedData;

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

  static updateAll = async (
    _: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { data } = await instance.get("/items/avatarItems");

      const parsedData = ZAvatarItem.array().parse(data);

      const dataInsertion = parsedData.map((item) => {
        return {
          updateOne: {
            filter: { id: item.id },
            upsert: true,
            document: item,
            update: {
              $set: item,
            },
          },
        };
      });

      const result = await AvatarItemModel.bulkWrite(dataInsertion, {
        ordered: false,
      });

      response.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };
}
