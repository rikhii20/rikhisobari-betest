require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const connect = require("./config");
const route = require("./routes");

connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", route);

app.listen(port, () => {
  console.log("app is listening at port", port);
});
