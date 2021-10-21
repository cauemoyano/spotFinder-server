import { Router } from "express";
import { registerSchema } from "../validation/auth.js";
import { User } from "../models/User.js";
import { logIn } from "../auth.js";
import { guest } from "../middleware/auth.js";
import { catchAsync } from "../middleware/errors.js";
import { validate } from "../validation/joi.js";
import { BadRequest } from "../errors/index.js";

const router = Router();

router.post(
  "/register",
  guest,
  catchAsync(async (req, res) => {
    await validate(registerSchema, req.body);

    const { email, name, password } = req.body;

    const found = await User.exists({ email });

    if (found) {
      throw new BadRequest("Invalid email");
    }

    const user = await User.create({ email, name, password });

    logIn(req, user.id);

    res.json({ message: "OK" });
  })
);

export { router as register };
