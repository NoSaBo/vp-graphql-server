// @flow

import express from "express";
import expressGraphQL from "express-graphql";
import schema from "./schema";
import cors from "cors";
// import permissions from "./permissions";

const SECRET = "234l90fasdf23e";
const SECRET2 = "234l90fasdf23elkj34jl34";

const port = process.env.PORT || 4000;

const app = express();

app.use(cors());

// app.use(permissions);

app.use("/graphql", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

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
});
