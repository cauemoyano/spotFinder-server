import { IN_PROD } from "./app.js";

export const {
  SESSION_SECRET = "PLease keep it secret",
  SESSION_NAME = "sid",
  SESSION_IDLE_TIMEOUT = 1000 * 60 * 30, // 30 minutes
} = process.env;

export const SESSION_ABSOLUTE_TIMEOUT = +(
  process.env.SESSION_ABSOLUTE_TIMEOUT || 1000 * 60 * 60 * 6
); //six hours

export const SESSION_OPTIONS = {
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  cookie: {
    maxAge: +SESSION_IDLE_TIMEOUT,
    secure: IN_PROD,
    sameSite: true,
  },
  rolling: true,
  resave: false,
  saveUninitialized: false,
};
