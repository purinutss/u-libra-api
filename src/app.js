// const { sequelize, University } = require("./models");
// sequelize.sync({ alter: true });

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authenticateMiddleware = require("./middlewares/authenticate");
const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");

const authRoute = require("./routers/auth-route");
const commentRoute = require("./routers/comment-route");
const chapterRoute = require("./routers/chapter-route");
const bookRoute = require("./routers/book-route");
const categoryRoute = require("./routers/category-route");
const universityRoute = require("./routers/university-route");
const userRoute = require("./routers/user-route");

const app = express();

app.use(morgan("dev")); //log
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10000,
    message: { message: "many requested, please try again" }
  })
); //limit request
app.use(helmet()); //protect hijack
app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/comment", authenticateMiddleware, commentRoute);
app.use("/chapter", chapterRoute);
app.use("/book", bookRoute);
app.use("/category", categoryRoute);
app.use("/university", universityRoute);
app.use("/user", authenticateMiddleware, userRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 7999;
app.listen(port, () => console.log(`server run on port ${port}`));
