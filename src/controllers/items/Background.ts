import express from "express";
import { instance } from "../../services/index.js";
import { ZBackground } from "../../types/Background.js";
import { TDataRequest } from "../../types/DataRequest.js";
import { z } from "zod";

export class BackgroundsController {
  static getAll = async (
    request: TDataRequest<typeof ZBackground>,
    _: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { data } = await instance.get("/items/backgrounds");

      const parsedData = ZBackground.array().parse(data);

      request.data = parsedData;

      next();
    } catch (err) {
      next(err);
    }
  };

  static getByIds = async (
    request: TDataRequest<typeof ZBackground>,
    _: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { data } = await instance.get("/items/backgrounds");

      const { ids = "" } = request.query;

      const parsedIds = z.string().parse(ids);

      const idList = parsedIds.split(":");

      const parsedData = ZBackground.array().parse(data);

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
