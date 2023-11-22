import express from "express";
import { RotationsController } from "../controllers/Rotations.js";

export const rotationsRouter = express.Router();

rotationsRouter.get("/roleRotations", RotationsController.getAll);
