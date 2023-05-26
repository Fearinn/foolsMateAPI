import express from "express";
import { PlayersController } from "../controllers/players/Players.js";

export const playersRouter = express.Router();

playersRouter.get("/players/search", PlayersController.searchByUsername);
