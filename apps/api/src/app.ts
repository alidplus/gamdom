import { Request, Response } from "express";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import env from "./env";
import cookieParser from "cookie-parser";
import setupServices from "./services";

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser(env.COOKIES_SECRET));
app.use(
  cors({
    origin: env.ORIGIN,
  }),
);
app.use(express.json());
app.use(express.urlencoded());

setupServices(app);

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("AWESOME GAMDOM API!");
});

export default app;
