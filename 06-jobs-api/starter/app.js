require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");

const jobsRouter = require("./routes/jobs");
const authRouter = require("./routes/auth");
const verifyJWT = require("./middleware/authentication");
const xss = require("xss");
const helmet = requrie("helmet");
const rateLimit = require("express-rate-limit");
const cros = require("cros");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
// extra packages

app.use(cros());
app.use(helmet());
app.use(xss());
const limiter = rateLimit({
  windowMs: 60 * 10 * 1000,
  limit: 100,
  message: "Too many request, please try again.",
});
app.use(limiter);
// routes
app.use("/api/v1/jobs", verifyJWT, jobsRouter);
app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(
      process.env.Mongo_URL.replace("<db_password>", process.env.DB_password)
    );
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
