import express from "express";
import { LoadingScreen, ZLoadingScreen } from "../types/LoadingScreen.js";
import { instance } from "../../common/services/index.js";
import { DataRequest } from "../../common/types/DataRequest.js";

export class LoadingScreensController {
  static getAll = async (
    request: DataRequest<LoadingScreen>,
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
