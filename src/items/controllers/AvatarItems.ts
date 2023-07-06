import express from "express";
import mongoose from "mongoose";
import { z } from "zod";
import { AvatarItemModel } from "../models/AvatarItems.js";
import {
  AvatarItem,
  ZAvatarItem,
  ZAvatarItemGender,
  ZAvatarItemType,
} from "../types/AvatarItem.js";
import { instance } from "../../common/services/index.js";
import { AggregateRequest } from "../../common/types/Aggregate.js";
import { ZId } from "../../common/types/Id.js";
import { ZRarity } from "../../common/types/Rarity.js";
import { BaseError } from "../../common/utils/errors/BaseError.js";

type PartialItem = Partial<AvatarItem>;

export class AvatarItemsController {
  static getAll = async (
    req: AggregateRequest<PartialItem>,
    _: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const {
        id = null,
        gender = null,
        rarity = null,
        type = null,
        event = null,
        idList = null,
      } = req.query;

      const parsedIdList = z.string().nullable().parse(idList)?.split(":");

      const parsedEvent = z
        .string()
        .nullable()
        .parse(event)
        ?.replace(/\s+/gi, "_");

      const filterBody: mongoose.FilterQuery<PartialItem> = {};

      if (id && !parsedIdList) filterBody.id = ZId.parse(id);
      if (parsedIdList) filterBody.id = { $in: parsedIdList };

      if (gender) filterBody.gender = ZAvatarItemGender.parse(gender);
      if (rarity) filterBody.rarity = ZRarity.parse(rarity);
      if (type) filterBody.type = ZAvatarItemType.parse(type);

      if (parsedEvent)
        filterBody.event = { $regex: parsedEvent, $options: "im" };

      const data = AvatarItemModel.aggregate<AvatarItem>([
        {
          $match: filterBody,
        },
      ]);

      const parsedData = z
        .instanceof(mongoose.Aggregate<PartialItem>)
        .parse(data);

      req.data = parsedData;

      next();
    } catch (err) {
      next(err);
    }
  };

  static updateAll = async (
    req: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { data } = await instance.get("/items/avatarItems");

      const { authorization } = req.headers;

      if (authorization !== process.env["UPDATE_AUTHORIZATION"]) {
        throw new BaseError("Access unauthorized", 401);
      }

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
