import express from "express";
import { instance } from "../../services/index.js";
import { IBackground } from "../../types/Background.js";
import { filterByType } from "../../utils/filterByType.js";
import { isBackground } from "../../utils/typeGuards/isBackground.js";

export class BackgroundsController {
  static getAll = async (_: express.Request, response: express.Response) => {
    try {
      const { data, status } = await instance.get("/items/backgrounds");

      if (!Array.isArray(data)) {
        throw new Error(
          "Type of response data doesn't match the expected type"
        );
      }

      const selectedItems = filterByType<IBackground>(data, isBackground);

      response.status(status).json(selectedItems);
    } catch (error) {
      console.log(error);
      response
        .status(500)
        .send("An unexpected error occurred! Please try again later");
    }
  };

  static getByIds = async (
    request: express.Request,
    response: express.Response
  ) => {
    try {
      const { data, status } = await instance.get("/items/backgrounds");

      const { ids } = request.query;

      if (typeof ids !== "string") {
        throw new Error("Bad request");
      }

      if (!Array.isArray(data)) {
        throw new Error(
          "Type of response data doesn't match the expected type"
        );
      }

      const idList = ids.split(":");

      const safeData = filterByType<IBackground>(data, isBackground);

      const selectedItems = safeData.filter((item) => idList.includes(item.id));

      if (selectedItems.length <= 0) {
        response
          .status(404)
          .send("No item was found with the given parameters");
        return;
      }

      response.status(status).send(selectedItems);
    } catch (error) {
      response
        .status(500)
        .send("An unexpected error occurred! Please try again later");
    }
  };
}
