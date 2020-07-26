"use strict";

import * as express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import * as cors from "cors";
import * as morgan from "morgan";
import * as helmet from "helmet";
import spellSchemas from "../schemas/spell.schema";
import buildMethods from "../methods/spells.methods"

async function serve(db) {
  try {
    const PORT = process.env.PORT;
    const app = express();
    app.use(cors());
    app.use(morgan("dev"));
    app.use(helmet());

    console.log("Building D&D Methods...");
    const methods = await buildMethods(db);

    console.log("Initializing server...")
    app.use("/graphql", graphqlHTTP({
      schema: spellSchemas,
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