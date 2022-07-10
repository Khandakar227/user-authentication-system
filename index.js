//ts-check
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const userRoutes = require("./routes/user");
const verifyRoutes = require("./routes/verify");
const forgotPasswordRoutes = require("./routes/forgotpassword");
const resetPasswordRoutes = require("./routes/resetpassword");
const { connect } = require("mongoose");
const rateLimiterMiddleware = require("./middlewares/rateLimiterFlexible");

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/verify", verifyRoutes);
app.use("/api/forgotpassword", forgotPasswordRoutes);
app.use("/api/resetpassword", resetPasswordRoutes);

connect(process.env.MONGODB_URL, {
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 100, // Reconnect every 100ms
})
  .then(() => {
    console.log("connected to database!");
  })
  .catch((error) => {
    console.log("connection failed! ", error);
  });

app.use(rateLimiterMiddleware);

app.listen(PORT, () => {
  console.log("server started running at port", PORT);
});
