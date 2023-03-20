import express from "express";
import {
  AvatarItemsController, RoleIconsController,
} from "../controllers/ItemsController.js";

const router = express.Router();

router
  .get("/items/avatarItems", AvatarItemsController.getAll)
  .get("/items/roleIcons", RoleIconsController.getAll)

export default router;
