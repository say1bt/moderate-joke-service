const mongoose = require("mongoose");
const { USER } = require("../constants/model_constants");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model(USER, userSchema);

module.exports = User;
