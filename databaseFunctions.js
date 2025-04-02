const mongoose = require("mongoose");
const Item = require("./models/items");

// Connect to DB
async function connectDB() {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB!");
  } catch (e) {
    console.error(e);
  }
}

// Find Item

async function findItem(search) {
  const searchRegEx = new RegExp(search, "i");
  await connectDB();
  const foundItem = await Item.find({
    $or: [{ title: searchRegEx }, { description: searchRegEx }],
  });
  mongoose.connection.close();
  await foundItem.forEach((item) => console.log(item));
  return await foundItem;
}

async function addItem(item) {
  await connectDB();
  Item.create(item).then(() => {
    console.log("New Item Added");
    mongoose.connection.close();
  });
  return "New Item Added";
}

module.exports = { findItem, addItem };
