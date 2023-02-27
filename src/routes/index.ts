import express from "express";
import itemsRoutes from "./itemsRoutes.js";

const basicRoute = express.Router();

basicRoute.get("/", (_: express.Request, response: express.Response) => {
  response.json("Welcome to Wolvesville Wiki!");
});

function routes(app: express.Application) {
  app.use(express.json(), basicRoute, itemsRoutes);
}

export default routes;
