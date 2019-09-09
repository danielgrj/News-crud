const { model, Schema } = require("mongoose");

const newSchema = new Schema({
  title: String,
  body: String,
  author: {
    ref: "User",
    type: Schema.Types.ObjectId
  }
});

module.exports = model("New", newSchema);
