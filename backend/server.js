const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8080;
const cors = require("cors");
const { router } = require("./src/routes/routes");
const cookieParser = require("cookie-parser"); 


app.use(express.json());
app.use(cors())
app.use(cookieParser());
app.use("/", router);

mongoose.connection.once("open", () => {
  app.listen(port, () => {
    console.log(`App listening at port: ${port}`);
  });
});
