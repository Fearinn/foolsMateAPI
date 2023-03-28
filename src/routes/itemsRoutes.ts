import express from "express";
import { LoadingScreensController } from "../controllers/items/LoadingScreens.js";
import {
  AvatarItemsController,
  RoleIconsController,
} from "../controllers/items/index.js";

export const itemsRouter = express.Router();

itemsRouter
  .get("/items/avatarItems", AvatarItemsController.getAll)
  .post("/items/avatarItemsByIds", AvatarItemsController.getByIds)
  .get("/items/roleIcons", RoleIconsController.getAll)
  .get("/items/randomLoadingScreen", LoadingScreensController.getRandom);
