// const { sequelize } = require("./models");
// sequelize.sync({ force: true });
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoute = require("./routers/auth-route");
const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");

const app = express();

app.use(morgan("dev")); //log
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { message: "many requested, please try again" },
  })
); //limit request
app.use(helmet()); //protect hijack
app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server run on port ${port}`));
