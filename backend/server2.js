const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8080;
const cors = require("cors");
const memeTemplateRoutes = require("./source/routes/MemeTemplateRoute");
const memeRoutes = require("./source/routes/MemeRoute");
const userRoutes = require("./source/routes/UserRoute");
const cookieParser = require("cookie-parser");

const { connectDB } = require("./source/connection/dbConnection");

connectDB();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/memeTemplate/", memeTemplateRoutes);
app.use("/meme/", memeRoutes);
app.use("/user/", userRoutes);

mongoose.connection.once("open", () => {
  app.listen(port, () => {
    console.log(`App listening at port: ${port}`);
  });
});
