import mongoose from "mongoose";
import pkg from "bcryptjs";
import { BCRYPT_WORK_FACTOR } from "../config/auth.js";

const userSchema = new mongoose.Schema(
  {
    email: String,
    name: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  const { hash } = pkg;
  if (this.isModified("password")) {
    this.password = await hash(this.password, BCRYPT_WORK_FACTOR);
  }
});

userSchema.methods.matchesPassword = function (password) {
  const { compare } = pkg;
  return compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
