// @flow

import express from "express";
import expressGraphQL from "express-graphql";
import schema from "./schema";
import cors from "cors";

const port = process.env.PORT || 4000;

const app = express();

app.use(cors());

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
