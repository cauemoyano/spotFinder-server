import {} from "dotenv/config";
import mongoose from "mongoose";
import session from "express-session";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import { APP_PORT } from "../config/app.js";
import { REDIS_OPTIONS } from "../config/cache.js";
import { MONGO_OPTIONS, MONGO_URI } from "../config/db.js";
import { createApp } from "./app.js";

//node not support await top level
(async () => {
  await mongoose.connect(MONGO_URI, MONGO_OPTIONS);

  const RedisStore = connectRedis(session);

  const client = new Redis(REDIS_OPTIONS);

  const store = new RedisStore({ client });

  const app = createApp(store);

  app.listen(APP_PORT, () => console.log("Listening on port 3333"));
})();
