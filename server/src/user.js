import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: String,
    phone: String,
    name: String,
    email: { type: String, unique: true, required: true },
    user_photo: String,
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
