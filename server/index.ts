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
    app.use(bodyParser.json());


    // if using a public deployment, restrict access by using a JWT system. (Not needed in sandbox)
    if (process.env.ENVIRONMENT === "development" || process.env.ENVIRONMENT === "production") {

      app.post("/authenticate", async function(req, res, next) {
        authModule.createToken(req, res, next, db);
      });

      app.use(authModule.authenticateJWT);
    // permits registration of new FD9000 users from a local environment ( this will allow us to do access control )

    // but, we don't necessarily want anyone creating accounts from a deploy just nowl
    } else if (process.env.ENVIRONMENT === "local") {
      app.post("/register", async function (req, res, next) {
        authModule.register(req, res, next, db);
      });
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