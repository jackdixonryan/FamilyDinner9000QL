"use strict";

import * as express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import * as cors from "cors";
import * as morgan from "morgan";
import * as helmet from "helmet";
import * as bodyParser from "body-parser";
import loadSchemas from "../schemas/schema";
import buildMethods from "../methods/spells.methods"
import authModule from "../middleware/auth";

async function serve(db) {
  try {
    const PORT = process.env.PORT;
    const app = express();
    app.use(cors());
    app.use(morgan("dev"));
    app.use(helmet());

    console.log("Building D&D Methods...");
    const methods = await buildMethods(db);
    const schema = await loadSchemas();

    console.log("Initializing server...");

    // if using a public deployment, restrict access by using a JWT system. (Not needed in sandbox)
    if (process.env.ENVIRONMENT === "development" || process.env.ENVIRONMENT === "production") {
      app.use(bodyParser.json());
      app.post("/authenticate", authModule.createToken);
      app.use(authModule.authenticateJWT);
    }

    app.use("/graphql", graphqlHTTP({
      schema: schema,
      rootValue: methods,
      graphiql: true,
    }));

    app.listen(PORT);
    console.log("fd-9000 running on PORT", PORT);
  } catch(error) {
    console.log("Massive error, guvnah! ", error);
  }
}

export default serve;