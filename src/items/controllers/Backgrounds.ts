import express from "express";
import { z } from "zod";
import { instance } from "../../common/services/index.js";
import { DataRequest } from "../../common/types/DataRequest.js";
import { ZRarity } from "../../common/types/Rarity.js";
import { Background, ZBackground } from "../types/Background.js";

export class BackgroundsController {
  static getAll = async (
    req: DataRequest<Background>,
    _: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { data } = await instance.get("/items/backgrounds");

      const {
        id = null,
        event = null,
        rarity = null,
        idList = null,
      } = req.query;

      const parsedData = ZBackground.array().parse(data);

      const parsedId = z.string().nullable().parse(id);

      const parsedIdList = z.string().nullable().parse(idList)?.split(":");

      const parsedRarity = ZRarity.nullable().parse(rarity);

      const parsedEvent = z
        .string()
        .nullable()
        .parse(event)
        ?.replace(/\s+/gi, "_")
        .toUpperCase();

      const filteredData = parsedData.filter((background) => {
        let isIncluded = true;

        if (parsedId && !parsedIdList) isIncluded = background.id === parsedId;
        if (parsedIdList) isIncluded = parsedIdList.includes(background.id);
        if (parsedRarity) isIncluded = background.rarity === parsedRarity;
        if (parsedEvent) isIncluded = !!background.event?.match(parsedEvent);

        return isIncluded;
      });

      req.data = filteredData;

      next();
    } catch (err) {
      next(err);
    }
  };
}
