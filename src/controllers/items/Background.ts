import express from "express";
import { instance } from "../../services/index.js";
import { IBackground } from "../../types/Background.js";
import { filterByType } from "../../utils/filterByType.js";
import { isBackground } from "../../utils/typeGuards/isBackground.js";
import { BaseError } from "../../utils/errors/BaseError.js";
import { NotFound } from "../../utils/errors/NotFound.js";
import { BadRequest } from "../../utils/errors/BadRequest.js";

export class BackgroundsController {
  static getAll = async (
    _: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { data, status } = await instance.get("/items/backgrounds");

      if (!Array.isArray(data)) {
        throw new BaseError(
          "Type of response data doesn't match the expected type"
        );
      }

      const selectedItems = filterByType<IBackground>(data, isBackground);

      response.status(status).json(selectedItems);
    } catch (err) {
      next(err);
    }
  };

  static getByIds = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { data, status } = await instance.get("/items/backgrounds");

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

      response.status(status).send(selectedItems);
    } catch (err) {
      next(err);
    }
  };
}
