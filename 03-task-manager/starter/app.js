//console.log('Task Manager App')
const express = require("express");
const app = express();
const tasks = require("./router/tasks");
const dotenv = require("dotenv");
const connectDb = require("./db/connect");
const notFound = require("./midddlerware/not-found");
const errorHandler = require("./midddlerware/error-handler");
dotenv.config();

const port = process.env.port || 3000;
app.use(express.json());
app.use(express.static("./public"));
//middleware
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDb(
      process.env.DB_URL.replace("<db_password>", process.env.DB_PASSWORD)
    );
    console.log("Connected to database...");
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
