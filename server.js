const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const asyncHandler = require("express-async-handler");
const UserRouter = require("./Router/userRouter");

const app = express();
app.use(cors());
app.use(express.json());

const mongoDb = asyncHandler(async () => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://chitramurugesank:36wrk6LcZwCfQlTp@nodejsauthentication.zidpajo.mongodb.net/?retryWrites=true&w=majority&appName=NodeJsAuthentication"
      )
      .then(() => {
        console.log("DB connected");
      });
  } catch (error) {
    console.log(error);
  }
});
mongoDb();

app.use("/", UserRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running in the Port ${PORT}`);
});
