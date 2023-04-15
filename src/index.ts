import express from "express";
import { routes } from "./routes/index.js";
import cors from "cors";
import * as dotenv from "dotenv";
import { handleError } from "./middlewares/handleError.js";

dotenv.config();

const app = express();

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

app.use(
  (
    err: unknown,
    _: express.Request,
    res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: express.NextFunction
  ) => handleError(err, res)
);
