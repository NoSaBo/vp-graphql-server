// @flow

import express from "express";
import expressGraphQL from "express-graphql";
import schema from "./schema";

const APP_PORT = 4000;

const app = express();

app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    pretty: true,
    graphiql: true
  })
);

app.listen(APP_PORT, () => {
  console.log("Server running on port: " + APP_PORT);
});
