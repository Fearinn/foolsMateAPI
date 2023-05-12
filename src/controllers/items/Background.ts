import express from "express";
import mongoose from "mongoose";
import { z } from "zod";
import { BackgroundModel } from "../../models/Backgrounds.js";
import { instance } from "../../services/index.js";
import { AggregateRequest } from "../../types/Aggregate.js";
import { ZId } from "../../types/Id.js";
import { ZRarity } from "../../types/Rarity.js";
import { BaseError } from "../../utils/errors/BaseError.js";
import { Background, ZBackground } from "../../models/types/Background.js";

type PartialBackground = Partial<Background>;

export class BackgroundsController {
  static getAll = async (
    req: AggregateRequest<PartialBackground>,
    _: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { event = null, rarity = null } = req.query;

      const parsedEvent = z
        .string()
        .nullable()
        .parse(event)
        ?.replace(/\s+/gi, "_");

      const filterBody: mongoose.FilterQuery<PartialBackground> = {};

      if (rarity) filterBody.rarity = ZRarity.parse(rarity);
      if (parsedEvent)
        filterBody.event = { $regex: parsedEvent, $options: "im" };

      const data = BackgroundModel.aggregate<Background>([
        {
          $match: filterBody,
        },
      ]);

      const parsedData = z
        .instanceof(mongoose.Aggregate<Background>)
        .parse(data);

      req.data = parsedData;

      next();
    } catch (err) {
      next(err);
    }
  };

  static getByIds = async (
    req: AggregateRequest<PartialBackground>,
    _: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { ids = "" } = req.query;

      const parsedIds = ZId.parse(ids);

      const idsList = parsedIds.split(":");

      const data = BackgroundModel.aggregate<Background>([
        {
          $match: {
            id: {
              $in: idsList,
            },
          },
        },
      ]);

      const parsedData = z
        .instanceof(mongoose.Aggregate<Background>)
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
      const { data } = await instance.get("/items/backgrounds");

      const { Authorization } = req.headers;

      if (Authorization === process.env["UPDATE_AUTHORIZATION"]) {
        throw new BaseError("Access unauthorized", 401);
      }

      const parsedData = ZBackground.array().parse(data);

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

      const result = await BackgroundModel.bulkWrite(dataInsertion, {
        ordered: false,
      });

      response.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };
}
