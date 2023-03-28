import express from "express";
import { itemsRouter } from "./itemsRoutes.js";

const basicRoute = express.Router();

basicRoute.get("/", (_: express.Request, response: express.Response) => {
  response.json("Welcome to Wolvesville Wiki!");
});

export function routes(app: express.Application) {
  app.use(express.json(), basicRoute, itemsRouter);
}
