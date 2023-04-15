import express from "express";
import { instance } from "../../services/index.js";
import { IBackground } from "../../types/Background.js";
import { filterByType } from "../../utils/filterByType.js";
import { isBackground } from "../../utils/typeGuards/isBackground.js";
import { BaseError } from "../../utils/errors/BaseError.js";
import { NotFound } from "../../utils/errors/NotFound.js";
import { BadRequest } from "../../utils/errors/BadRequest.js";
import { TDataRequest } from "../../types/DataRequest.js";

export class BackgroundsController {
  static getAll = async (
    request: TDataRequest<IBackground>,
    _: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { data } = await instance.get("/items/backgrounds");

      if (!Array.isArray(data)) {
        throw new BaseError(
          "Type of response data doesn't match the expected type"
        );
      }

      const selectedItems = filterByType<IBackground>(data, isBackground);

      request.data = selectedItems;

      next();
    } catch (err) {
      next(err);
    }
  };
  

  static getByIds = async (
    request: TDataRequest<IBackground>,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { data } = await instance.get("/items/backgrounds");

      const { ids = "" } = request.query;

      if (typeof ids !== "string") {
        throw new BadRequest();
      }

      if (!Array.isArray(data)) {
        throw new BaseError(
          "Type of response data doesn't match the expected type"
        );
      }

      const idList = ids.split(":");

      const safeData = filterByType<IBackground>(data, isBackground);

      const selectedItems = safeData.filter((item) => idList.includes(item.id));

      if (selectedItems.length <= 0) {
        throw new NotFound("background");
      }

      request.data = selectedItems;

      next();
    } catch (err) {
      next(err);
    }
  };
}
