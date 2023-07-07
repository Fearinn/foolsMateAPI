import express from "express";
import { RewardController, SeasonController } from "../controllers/index.js";

export const battlePassRouter = express.Router();

battlePassRouter
  .get("/battlePass/season", SeasonController.getAll)
  .get("/battlePass/rewards", RewardController.getAll)
  .post("/battlePass/rewards/update", RewardController.updateAll);
