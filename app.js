const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
require("dotenv").config();
const methodOverride = require("method-override");

const app = express();
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(methodOverride("_method"));
const appRouter = require("./routes/appRouter");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.use("/", appRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app running on port ${PORT}!`)); 