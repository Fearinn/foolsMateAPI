import express from "express";
import { RolesController } from "../controllers/Role.js";

export const rolesRouter = express.Router();

rolesRouter
  .get("/roles", RolesController.getAll)
  .post("/roles/update", RolesController.updateAll);
