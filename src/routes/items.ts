import express from "express";
import { LoadingScreensController } from "../controllers/items/LoadingScreens.js";
import {
  AvatarItemsController,
  RoleIconsController,
} from "../controllers/items/index.js";
import { BackgroundsController } from "../controllers/items/Background.js";

export const itemsRouter = express.Router();

itemsRouter
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
