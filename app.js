const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db", (error) => {
  console.log("Connected to the database");
});

const routes = require("./routes");

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
  console.log("Working");
});

// const express = require("express");
// const mongoose = require("mongoose");

// const { PORT = 3001 } = process.env;
// const app = express();
// mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db", (r) => {
//   console.log("connected to DB", r);
// });

// app.use((req, res, next) => {
//   req.user = {
//     _id: "5d8b8592978f8bd833ca8133", // paste the _id of the test user created in the previous step
//   };
//   next();
// });

// const routes = require("./routes");

// app.use(express.json());
// app.use(routes);

// app.listen(PORT, () => {
//   console.log(`Server is listening on ${PORT}`);
//   console.log("is this working?");
// });
