const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());





const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running in the Port ${PORT}`);
});
