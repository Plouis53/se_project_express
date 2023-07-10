const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/error-handler");
const { errors } = require("celebrate");

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db", (r) => {
  console.log("Connected to the database", r);
});

const routes = require("./routes");

app.use(express.json());
app.use(cors());

// our routes
app.use(routes);

// celebrate error handler
app.use(errors());

// our centralized handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
  console.log("Working");
});
