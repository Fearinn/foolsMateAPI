import express from "express";
import { battlePassRouter } from "./battlePass.js";
import { itemsRouter } from "./items.js";
import { playersRouter } from "./players.js";

const basicRoute = express.Router();

basicRoute.get("/", (_: express.Request, response: express.Response) => {
  response.json("Welcome to Fool's Mate, the Wolvesville Online Tracker!");
});

export function routes(app: express.Application) {
  app.use(
    express.json(),
    basicRoute,
    itemsRouter,
    battlePassRouter,
    playersRouter
  );
}
