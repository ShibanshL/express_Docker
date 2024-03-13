const mongoose = require("mongoose");
const detailSchema = new mongoose.Schema(
  {
    name: String,
  },
  { versionKey: false }
);

const Details = mongoose.model("details", detailSchema);
module.exports = Details;

const Not_detailSchema = new mongoose.Schema(
  {
    name: String,
  },
  { versionKey: false }
);

const Not_Details = mongoose.model("details", detailSchema);
module.exports = Not_Details;
