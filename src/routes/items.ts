import express from "express";
import {
  AvatarItemsController,
  BackgroundsController,
  ItemController,
  LoadingScreensController,
  RoleIconsController,
} from "../controllers/items/index.js";

export const itemsRouter = express.Router();

itemsRouter
  .post("/items/update", ItemController.updateAll)
  .get("/items/avatarItems", AvatarItemsController.getAll)
  .get("/items/avatarItems/ids", AvatarItemsController.getByIds)
  .post("/items/avatarItems/update", AvatarItemsController.updateAll)
  .get("/items/roleIcons", RoleIconsController.getAll)
  .post("/items/roleIcons/update", RoleIconsController.updateAll)
  .get("/items/loadingScreens", LoadingScreensController.getAll)
  .get("/items/loadingScreens/random", LoadingScreensController.getRandom)
  .get("/items/backgrounds", BackgroundsController.getAll)
  .get("/items/backgrounds/ids", BackgroundsController.getByIds)
  .post("/items/backgrounds/update", BackgroundsController.updateAll);
