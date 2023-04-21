import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const parsedDbConnection = z.string().parse(process.env["DATABASE"]);

mongoose.connect(parsedDbConnection);

export const db = mongoose.connection;
