import instance from "../services/index.js";
import express from "express";
import pagination from "../utils/pagination.js";
import convertAndCeil from "../utils/convertAndCeil.js";

class AvatarItemsController {
  static getAll = async (
    request: express.Request,
    response: express.Response
  ) => {
    const { data, status } = await instance.get(
      "/items/avatarItems"
    );

    if (!Array.isArray(data)) {
      throw new Error("Type of response data don't match the expected type");
    }
    const limit = convertAndCeil(request.query.limit) || 20;
    const page = convertAndCeil(request.query.page) || 1;
    const numberOfPages = convertAndCeil(data.length / limit);
    const dataPage = pagination(data, page, limit);

    response.status(status).json({
      itemsCount: dataPage.length,
      totalItemsCount: data.length,
      pagesCount: numberOfPages,
      currentPage: page,
      data: dataPage,
    });
  };
}

class AvatarItemsSetsController {
  static getAll = async (
    request: express.Request,
    response: express.Response
  ) => {
    const { data, status } = await instance.get("/items/avatarItemSets");
    const limit = convertAndCeil(request.query.limit) || 20;
    const page = convertAndCeil(request.query.page) || 1;
    const numberOfPages = convertAndCeil(data.length / limit);
    const dataPage = pagination(data, page, limit);

    response.status(status).json({
      totalItemsCount: data.length,
      pagesCount: numberOfPages,
      currentPage: page,
      data: dataPage,
    });
  };
}

class RoleIconsController {
  static getAll = async (
    request: express.Request,
    response: express.Response
  ) => {
    const { data, status } = await instance.get("/items/roleIcons");
    const limit = convertAndCeil(request.query.limit) || 20;
    const page = convertAndCeil(request.query.page) || 1;
    const numberOfPages = convertAndCeil(data.length / limit);
    const dataPage = pagination(data, page, limit);

    response.status(status).json({
      totalItemsCount: data.length,
      pagesCount: numberOfPages,
      currentPage: page,
      data: dataPage,
    });
  };
}

export {
  AvatarItemsController,
  AvatarItemsSetsController,
  RoleIconsController,
};
