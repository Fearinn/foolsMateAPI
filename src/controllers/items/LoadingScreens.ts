import express from "express";
import { instance } from "../../services/index.js";
import { filterByType } from "../../utils/filterByType.js";
import { isLoadingScreen } from "../../utils/typeGuards/isLoadingScreen.js";

export class LoadingScreensController {
  static getRandom = async (_: express.Request, response: express.Response) => {
    try {
      const { data, status } = await instance.get("/items/loadingScreens");

      if (!Array.isArray(data)) {
        throw new Error("Type of response data don't match the expected type");
      }

      const filteredData = filterByType(data, isLoadingScreen);

      const randomIndex = Math.ceil(Math.random() * data.length);
      const randomLoadingScreen = filteredData[randomIndex];

      response.status(status).json(randomLoadingScreen);
    } catch (error) {
      console.log(error);
      response
        .status(500)
        .send("An unexpected error occurred! Please try again later");
    }
  };
}