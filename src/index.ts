import express from "express";
import { routes } from "./routes/index.js";
import cors from "cors";
import * as dotenv from "dotenv";
import { handleError } from "./middlewares/handleError.js";
import { handlePage404 } from "./middlewares/handlePage404.js";
import { db } from "./config/dbConnection.js";
import { handleDbPagination } from "./middlewares/handleDbPagination.js";
import { handleSimplePagination } from "./middlewares/handleSimplePagination.js";

dotenv.config();

const app = express();

db.on("error", console.log.bind(console, "Connection error"));
db.once("open", () => {
  console.log("Successfully connected");
});

app.use(
  cors({
    origin: ["https://wolvesville-wiki.vercel.app"],
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
