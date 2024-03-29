const express = require("express");
const db = require("./models/db");
const cors = require("cors");
require ("dotenv").config()
const app = express();
const PORT =  5000;

app.use(cors());
app.use(express.json());
const rolesRouter = require("./routes/rolesRoute")
app.use("/roles",rolesRouter);
const usersRouter = require("./routes/usersRoute")
app.use("/users",usersRouter);
const tweetsRouter = require("./routes/tweetsRoute")
app.use("/tweets",tweetsRouter);
const repliesRouter = require("./routes/repliesRoute")
app.use("/replies",repliesRouter);
const retweetRouter = require("./routes/retweetRoute");
app.use("/retweet",retweetRouter);


app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
