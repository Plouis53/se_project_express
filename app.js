const express = require("express");
const { PORT = 3001 } = process.env;
const app = express();

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
  console.log("is this working?");
});
