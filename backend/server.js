const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8080;
const cors = require("cors");
const  memeRoutes  = require("./src/routes/memeRoutes");
const  userRoutes  = require("./src/routes/userRoutes");
const cookieParser = require("cookie-parser"); 

const { connectDB } = require("./src/connection/dbConnection");

connectDB();

app.use(express.json());
app.use(cors())
app.use(cookieParser());
app.use("/meme/", memeRoutes);
app.use("/user/", userRoutes);

mongoose.connection.once("open", () => {
  app.listen(port, () => {
    console.log(`App listening at port: ${port}`);
  });
});
