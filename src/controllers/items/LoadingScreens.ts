import express from "express";
import { instance } from "../../services/index.js";
import { ZLoadingScreen } from "../../types//items/LoadingScreen.js";
import { TDataRequest } from "../../types/DataRequest.js";

export class LoadingScreensController {
  static getAll = async (
    request: TDataRequest<typeof ZLoadingScreen>,
    _: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { data } = await instance.get("/items/loadingScreens");

      const parsedData = ZLoadingScreen.array().parse(data);

      request.data = parsedData;

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

      const parsedData = ZLoadingScreen.array().parse(data);

      const randomIndex = Math.ceil(Math.random() * data.length);
      const randomLoadingScreen = parsedData[randomIndex];

      response.status(status).send(randomLoadingScreen);
    } catch (err) {
      next(err);
    }
  };
}
