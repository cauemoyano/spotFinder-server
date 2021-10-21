import { Router } from "express";
import { logIn, logOut } from "../auth.js";
import { Unauthorized } from "../errors/index.js";
import { auth, guest } from "../middleware/auth.js";
import { catchAsync } from "../middleware/errors.js";
import { User } from "../models/User.js";
import { loginSchema } from "../validation/auth.js";
import { validate } from "../validation/joi.js";

const router = Router();

router.post(
  "/login",
  guest,
  catchAsync(async (req, res) => {
    await validate(loginSchema, req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.matchesPassword(password))) {
      throw new Unauthorized("Incorrect email or password.");
    }

    logIn(req, user.id);

    res.json({ message: "OK" });
  })
);

router.post(
  "/logout",
  auth,
  catchAsync(async (req, res) => {
    await logOut(req, res);

    res.json({ message: "OK" });
  })
);

export { router as login };
