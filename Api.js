const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

// const bodyParser = require("body-parser");

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
};

app.use(express.json());
// app.use(bodyParser.json({ limit: "200mb" }));
app.use(cors());

const Details = require("./Models");

app.get("/", async (req, res) => {
  console.log("Simple Get req sent");
  try {
    const newData = await Details.find({});
    res.status(200).json({ message: newData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/", async (req, res) => {
  console.log("Simple Post req sent");
  try {
    const newData = await Details.create(req.body);
    res.status(200).json({ message: newData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/:id", async (req, res) => {
  try {
    const newData = await Details.findById(req.params.id);
    res.status(200).json({ message: newData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    if (req.params.id == "all") {
      const newData = await Details.deleteMany({});
      return res.status(200).json({ message: newData });
    }
    const newData = await Details.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: newData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.patch("/:id", async (req, res) => {
  try {
    const newData = await Details.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
    });
    res.status(200).json({ message: newData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3000, () => {
      console.log(`Node API app is running on port 3000`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
