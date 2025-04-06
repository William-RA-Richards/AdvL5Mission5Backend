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

// Add Item

async function addItem(item) {
  await connectDB();
  Item.create(item).then(() => {
    console.log("New Item Added");
    mongoose.connection.close();
  });
  return "New Item Added";
}

// Update Item

async function updateItem(_id, item) {
  await connectDB();
  Item.updateOne({ _id }, item).then(() => {
    console.log("Item Updated");
    mongoose.connection.close();
  });
  return "Item Updated";
}

// Remove Item

async function removeItem(_id) {
  await connectDB();
  Item.deleteOne({ _id }).then(() => {
    console.log("Item Removed");
    mongoose.connection.close();
  });
  return "Item Removed";
}

module.exports = { findItem, addItem, updateItem, removeItem };
