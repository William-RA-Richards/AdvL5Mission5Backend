const express = require("express");
const cors = require("cors");
require("dotenv").config();
const {
  findItem,
  addItem,
  updateItem,
  removeItem,
} = require("./databaseFunctions");

//* Enable Express (Remove if RiskAPI is the main app)
const app = express();

//* Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust to match your frontend URL
    methods: ["GET", "POST"], // Allow only needed HTTP methods
    credentials: true,
  })
);
app.use(express.json());

//* Test endpoint
app.get("/", (req, res) => {
  res.send("The backend is running!");
});

// Create Operation

app.post("/api/create", async (req, res) => {
  const item = req.body;
  console.log(item);
  await addItem(item);
  res.status(200).send({ response: item });
});

// Read Operation

app.get("/api/search", async (req, res) => {
  const { search_string } = req.query;
  const foundItem = await findItem(search_string);
  res.status(200).send({ response: foundItem });
});

// Update Operation

app.put("/api/update", async (req, res) => {
  const { _id, title, description, start_price, reserve_price } = req.body;
  const removedItem = await updateItem(_id, {
    title,
    description,
    start_price,
    reserve_price,
  });
  res.status(200).send({ response: removedItem });
});

// Delete Operation

app.delete("/api/remove", async (req, res) => {
  const { _id } = req.body;
  const removedItem = await removeItem(_id);
  res.status(200).send({ response: removedItem });
});

const PORT = process.env.PORT || 4000; // Default port to 4000 if not set in .env
app
  .listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    console.error("Server Error: ", err);
  });

module.exports = { app };
