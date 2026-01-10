require("dotenv").config();

const express = require("express");
const app = express();

// database
const connectDB = require("./db/connect");
const productsRoute = require("./routes/productRoutes");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const fileUpload = require("express-fileupload");
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.send("<h1>File Upload Starter</h1>");
});
app.use(fileUpload());
app.use(express.json());
app.use("/api/v1/products", productsRoute);
// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
