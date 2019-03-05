// @flow

import express from "express";
import expressGraphQL from "express-graphql";
import schema from "./schema";
import cors from "cors";
import isAuth from "./middleware/is-auth";

const port = process.env.PORT || 4000;

const app = express();

app.use(cors());

app.use(isAuth);

app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    pretty: true,
    graphiql: true
  })
);

app.listen(port, () => {
  console.log("Server running on port: 4000");
});