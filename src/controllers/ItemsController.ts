import instance from "../services/index.js";
import express from "express";
import pagination from "../utils/pagination.js";

class AvatarItemsController {
  static getAll = async (
    request: express.Request,
    response: express.Response
  ) => {
    try {
      const { data, status } = await instance.get("/items/roleIcons");
      if (!Array.isArray(data)) {
        throw new Error("Type of response data don't match the expected type");
      }
      const limit = request.query.limit;
      const page = request.query.page;
      const dataPage = pagination(data, page, limit);

      response.status(status).json(dataPage);
    } catch (error) {
      console.log(error);
      response
        .status(501)
        .send("An unexpected error occurred! Please try again later");
    }
  };
}

class AvatarItemsSetsController {
  static getAll = async (
    request: express.Request,
    response: express.Response
  ) => {
    try {
      const { data, status } = await instance.get("/items/roleIcons");
      if (!Array.isArray(data)) {
        throw new Error("Type of response data don't match the expected type");
      }
      const limit = request.query.limit;
      const page = request.query.page;
      const dataPage = pagination(data, page, limit);

      response.status(status).json(dataPage);
    } catch (error) {
      console.log(error);
      response
        .status(501)
        .send("An unexpected error occurred! Please try again later");
    }
  };
}

class RoleIconsController {
  static getAll = async (
    request: express.Request,
    response: express.Response
  ) => {
    try {
      const { data, status } = await instance.get("/items/roleIcons");
      if (!Array.isArray(data)) {
        throw new Error("Type of response data don't match the expected type");
      }
      const limit = request.query.limit;
      const page = request.query.page;
      const dataPage = pagination(data, page, limit);

      response.status(status).json(dataPage);
    } catch (error) {
      console.log(error);
      response
        .status(501)
        .send("An unexpected error occurred! Please try again later");
    }
  };
}

export {
  AvatarItemsController,
  AvatarItemsSetsController,
  RoleIconsController,
};
