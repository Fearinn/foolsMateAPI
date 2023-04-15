import express from "express";
import { instance } from "../../services/index.js";
import { filterByType } from "../../utils/filterByType.js";
import { isLoadingScreen } from "../../utils/typeGuards/isLoadingScreen.js";
import { ILoadingScreen } from "../../types/LoadingScreen.js";
import { BaseError } from "../../utils/errors/BaseError.js";
import { TDataRequest } from "../../types/DataRequest.js";

export class LoadingScreensController {
  static getAll = async (
    request: TDataRequest<ILoadingScreen>,
    _: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { data } = await instance.get("/items/loadingScreens");

      if (!Array.isArray(data)) {
        throw new BaseError(
          "Type of response data doesn't match the expected type"
        );
      }

      const filteredItems = filterByType<ILoadingScreen>(data, isLoadingScreen);

      request.data = filteredItems;

      next();
    } catch (err) {
      next(err);
    }
  };

  static getRandom = async (
    _: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { data, status } = await instance.get("/items/loadingScreens");

      if (!Array.isArray(data)) {
        throw new Error(
          "Type of response data doesn't match the expected type"
        );
      }

      const filteredData = filterByType(data, isLoadingScreen);

      const randomIndex = Math.ceil(Math.random() * data.length);
      const randomLoadingScreen = filteredData[randomIndex];

      response.status(status).send(randomLoadingScreen);
    } catch (err) {
      next(err);
    }
  };
}
