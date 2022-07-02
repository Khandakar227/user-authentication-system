//ts-check
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user");
const verifyRoutes = require("./routes/verify");
const forgotPasswordRoutes = require("./routes/forgotpassword");
const { connect } = require("mongoose");

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/user", userRoutes);
app.use("/api/verify", verifyRoutes);
app.use("/api/forgotpassword", forgotPasswordRoutes);

connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("connected to database!");
  })
  .catch(() => {
    console.log("connection failed! ");
  });

app.listen(PORT, () => {
  console.log("server started running at port", PORT);
});
