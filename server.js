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

// app.use(cors());

// app.use(permissions);

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    optionsSuccessStatus: 200 /* some legacy browsers (IE11, various SmartTVs) choke on 204 */
  })
);

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
