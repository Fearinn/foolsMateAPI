import express from "express";
import {
  AvatarItemsController,
} from "../controllers/ItemsController.js";

const router = express.Router();

router
  .get("/items/avatarItems", AvatarItemsController.getAll)

export default router;
