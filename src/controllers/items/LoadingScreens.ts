import express from "express";
import { ZLoadingScreen } from "../../models/types/LoadingScreen.js";
import { instance } from "../../services/index.js";
import { DataRequest } from "../../types/DataRequest.js";

export class LoadingScreensController {
  static getAll = async (
    request: DataRequest<typeof ZLoadingScreen>,
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
