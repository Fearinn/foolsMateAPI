import express from "express";
import { battlePassRouter } from "./battlePass/routes/index.js";
import { itemsRouter } from "./items/routes/index.js";
import { playersRouter } from "./players/routes/index.js";
import { rolesRouter } from "./roles/routes/index.js";

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
    playersRouter,
    rolesRouter
  );
}
