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
  .post("/items/avatarItemsByIds", AvatarItemsController.getByIds)
  .get("/items/roleIcons", RoleIconsController.getAll)
  .get("/items/loadingScreens", LoadingScreensController.getAll)
  .get("/items/randomLoadingScreen", LoadingScreensController.getRandom)
  .get("/items/backgrounds", BackgroundsController.getAll)
  .post("/items/backgroundsByIds", BackgroundsController.getByIds);
