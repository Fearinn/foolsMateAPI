import express from "express";
import { SeasonController } from "../controllers/battlePass/index.js";

export const battlePassRouter = express.Router();

battlePassRouter
  .get("/battlePass/season", SeasonController.getAll)
  .post("/battlePass/season/update", SeasonController.updateAll)
  .get("/battlePass/season/rewards", SeasonController.getByRewardsType);
