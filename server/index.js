"use strict";

const express = require("express");
const app = express();
const port = 3010;
const cors = require("cors");
const router = require("./router");

const corsOptions = {
  origin: "http://localhost:3003",
  optionsSucessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(router);
app.listen(port, console.log(`server running on http://localhost:${port}`));
