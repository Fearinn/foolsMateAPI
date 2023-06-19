import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import { db } from "./config/dbConnection.js";
import { handleDbPagination } from "./common/middlewares/handleDbPagination.js";
import { handleError } from "./common/middlewares/handleError.js";
import { handlePage404 } from "./common/middlewares/handlePage404.js";
import { handleSimplePagination } from "./common/middlewares/handleSimplePagination.js";
import { routes } from "./routes.js";

dotenv.config();

const app = express();

db.on("error", console.log.bind(console, "Connection error"));
db.once("open", () => {
  console.log("Successfully connected");
});

app.use(
  cors({
    origin: ["https://fools-mate.vercel.app"],
    optionsSuccessStatus: 200,
  })
);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});

routes(app);

app.use(handleDbPagination);
app.use(handleSimplePagination);

app.use((_, __, next) => handlePage404(next));

app.use(
  (
    err: unknown,
    _: express.Request,
    res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: express.NextFunction
  ) => handleError(err, res)
);
