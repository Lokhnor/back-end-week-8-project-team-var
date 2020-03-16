const express = require("express");
var path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const pgSession = require("./middleware/pgsession");
const cors = require("cors");
const port = 5000;

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

// Pick and choose which middleware you want
// You will definitely add to and subtract from this list

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(pgSession);
app.use(cookieParser("secret"));

app.use("/", indexRouter);
app.use("/users", usersRouter);
// app.use("/providers", indexRouter);

app.get("/", function(req, res) {
  res.send("All good");
});

app.get("/secret", (req, res) => {
  const { data } = req.session;
  if (data.loggedIn) {
    return res.json({
      success: true
    });
  }
});

// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });

module.exports = app;
