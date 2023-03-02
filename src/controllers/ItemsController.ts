import instance from "../services/index.js";
import express from "express";
import pagination from "../utils/pagination.js";

class AvatarItemsController {
  static getAll = async (
    request: express.Request,
    response: express.Response
  ) => {
    const { data, status } = await instance.get("/items/avatarItems");

    if (!Array.isArray(data)) {
      throw new Error("Type of response data don't match the expected type");
    }
    const limit = request.query.limit;
    const page = request.query.page;
    const dataPage = pagination(data, page, limit);

    response.status(status).json(dataPage);
  };
}

class AvatarItemsSetsController {
  static getAll = async (
    request: express.Request,
    response: express.Response
  ) => {
    const { data, status } = await instance.get("/items/avatarItemSets");
    if (!Array.isArray(data)) {
      throw new Error("Type of response data don't match the expected type");
    }
    const limit = request.query.limit;
    const page = request.query.page;
    const dataPage = pagination(data, page, limit);

    response.status(status).json(dataPage);
  };
}

class RoleIconsController {
  static getAll = async (
    request: express.Request,
    response: express.Response
  ) => {
    const { data, status } = await instance.get("/items/roleIcons");
    if (!Array.isArray(data)) {
      throw new Error("Type of response data don't match the expected type");
    }
    const limit = request.query.limit;
    const page = request.query.page;
    const dataPage = pagination(data, page, limit);

    response.status(status).json(dataPage);
  };
}

export {
  AvatarItemsController,
  AvatarItemsSetsController,
  RoleIconsController,
};
