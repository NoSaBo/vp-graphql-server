// @flow

import express from "express";
import expressGraphQL from "express-graphql";
import schema from "./schema";
import cors from "cors";
require("dotenv").config();
// import permissions from "./permissions";

// const SECRET = "234l90fasdf23e";
// const SECRET2 = "234l90fasdf23elkj34jl34";

const SECRET = process.env.SECRET;
const SECRET2 = process.env.SECRET2;

const port = process.env.PORT || 4000;

const app = express();

app.use(cors());

// app.use(permissions);

app.use(
  "/graphql",
  expressGraphQL(req => ({
    schema: schema,
    pretty: true,
    graphiql: true,
    context: {
      SECRET,
      SECRET2,
      user: req
    }
  }))
);

app.listen(port, () => {
  console.log("Server running on port: 4000");
  console.log("SECRET:", SECRET);
  console.log("SECRET2:", SECRET2);
});
