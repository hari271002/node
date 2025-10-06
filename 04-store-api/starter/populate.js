require("dotenv").config();

const connectDB = require("./db/connect");
const ProductSchema = require("./models/product");
const products = require("./products.json");

const start = async () => {
  try {
    await connectDB(
      process.env.DB_URL.replace("<db_password>", process.env.DB_PASSWORD)
    );
    console.log("DB connected");
    await ProductSchema.create(products);
    console.log("Date loaded");
    process.exit("1");
  } catch (error) {
    console.log(error);
    process.exit("0");
  }
};

start();
