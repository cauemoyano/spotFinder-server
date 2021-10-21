import express from "express";
import session from "express-session";
import { SESSION_OPTIONS } from "../config/session.js";
import {
  catchAsync,
  InternalServerError,
  notFound,
} from "./middleware/errors.js";
import { login } from "./routes/login.js";
import { register } from "./routes/register.js";
import { home } from "./routes/home.js";
import { active } from "./middleware/auth.js";

export const createApp = (store) => {
  const app = express();

  app.use(express.json());

  app.use(session({ ...SESSION_OPTIONS, store }));

  app.use(catchAsync(active));

  app.use(home);

  app.use(register);

  app.use(login);

  app.use(notFound);

  app.use(InternalServerError);

  return app;
};
