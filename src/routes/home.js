import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { catchAsync } from "../middleware/errors.js";
import { User } from "../models/User.js";

const router = Router();

router.get(
  "/home",
  auth,
  catchAsync(async (req, res) =>
    res.json(await User.findById(req.session.userId).select("-password -__v"))
  )
);

export { router as home };
