import express from "express";
import {
  AvatarItemsController, RoleIconsController,
} from "../controllers/items/index.js";

const router = express.Router();

router
  .get("/items/avatarItems", AvatarItemsController.getAll)
  .get("/items/roleIcons", RoleIconsController.getAll)

export default router;
