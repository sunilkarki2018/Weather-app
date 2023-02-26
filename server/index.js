require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const PORT = process.env.PORT;
const connectMongoDB = require("./db/mongodb");

// json parser middleware
// parse incoming requests with JSON, assign it to requests body
app.use(express.json());
const City = require("./models/City");

app.get("/api/test", (req, res) => {
  res.send("test");
});

// connect mongodb and start server
const start = async () => {
  console.log("Connecting to MongoDB");
  try {
    await connectMongoDB(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () =>
      console.log(`Weather app is listening on port ${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

app.post("/api/city", async (req, res) => {
  try {
    const city = await City.create(req.body);
    res.status(201).json({ success: true, data: city });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ success: false, msg: "Error with creating a City!" });
  }
});

app.get("/api/city", async (req, res) => {
  try {
    const cities = await City.find({});
    res.status(200).json({ success: true, data: cities });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
});

app.get("/api/city/:id", async (req, res) => {
  const { id } = req.params;
  const city = await City.findById(id);
  if (city) res.status(200).json({ success: true, data: city });
  else res.status(500).json({ success: false, error: "City not found!" });
});

app.delete("/api/city/:id", async (req, res) => {
  const { id } = req.params;
  const city = await City.findByIdAndDelete(id);
  if (city) res.status(200).json({ success: true, data: city });
  else res.status(500).json({ success: false, error: "City not found!" });
});

// start connection to mongodb and start server
start();
