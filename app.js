const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
require("dotenv").config();
const methodOverride = require("method-override");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.use(methodOverride("_method"));

const appRouter = require("./routes/appRouter");
const formsRouter = require("./routes/formsRouter");
const productsRouter = require("./routes/productsRouter");
const authRouter = require("./routes/authRouter");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.use("/", appRouter);
app.use("/forms", formsRouter);
app.use("/products", productsRouter);
app.use("/auth", authRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app running on port ${PORT}!`)); 