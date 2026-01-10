require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();
const connectDb = require("./db/connect");
const notFoundMiddlerware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productsRoutes");
const port = process.env.port || 3000;

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.jwt_secret));
app.get("/", (req, res) => {
  console.log(req.signedCookies);
  res.send("e-commerce-api");
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/products", productRoutes);

app.use(notFoundMiddlerware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDb(
      process.env.Mongo_URL.replace("<db_password>", process.env.DB_password)
    );
    app.listen(port, () =>
      console.log(
        `Database connection establised and server is listening on ${port}`
      )
    );
  } catch (error) {
    console.log(error);
  }
};

start();
