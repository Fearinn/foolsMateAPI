import instance from "../services/index.js";
import express from "express";

class AvatarItemsController {
  static getAll = async (_: express.Request, response: express.Response) => {
    const { data, status } = await instance.get("/items/avatarItems");
    console.log(data);
    response.status(status).json(data);
  };
}

class AvatarItemsSetsController {
  static getAll = async (_: express.Request, response: express.Response) => {
    const { data, status } = await instance.get("/items/avatarItems");
    console.log(data);
    response.status(status).json(data);
  };
}

class RoleIconsController {
  static getAll = async (_: express.Request, response: express.Response) => {
    const { data, status } = await instance.get("/items/roleIcons");
    console.log(data);
    response.status(status).json(data);
  };
}

export {
  AvatarItemsController,
  AvatarItemsSetsController,
  RoleIconsController,
};
