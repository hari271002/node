//console.log("04 Store API");
const express = require("express");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const route = require("./routes/products");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

const port = process.env.port || 4000;

app.use(express.json());

//middleware
app.use("/api/v1/products", route);
app.use(notFound);
app.use(errorHandlerMiddleware);

//db connect

const start = async () => {
  try {
    await connectDB(
      process.env.DB_URL.replace("<db_password>", process.env.DB_PASSWORD)
    );
    console.log("DB connected");
    app.listen(port, () => {
      console.log(`App is listening at ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
