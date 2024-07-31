const mongoose = require("mongoose");
const { mongoUri } = require("../configs/config");

exports.connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoUri);
  } catch (err) {}
};
