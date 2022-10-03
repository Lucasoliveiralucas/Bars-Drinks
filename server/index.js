"use strict";
const Express = require("express");
const app = Express();
const port = 3012;
const cors = require("cors");
const router = require("./router");
const corsOptions = {
  origin: "http://localhost:3001",
  credentials: true,
  optionsSucessStatus: 200,
};

app.use(cors(corsOptions));
app.use(Express.json());
app.use(router);
app.listen(port, console.log(`server running on http://localhost:${port}`));
