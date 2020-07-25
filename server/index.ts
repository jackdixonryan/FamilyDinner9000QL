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
    const app = express();
    app.use(cors());
    app.use(morgan("dev"));
    app.use(helmet());

    console.log("Building D&D Methods...");
    const methods = await buildMethods(db);


    app.use("/graphql", graphqlHTTP({
      schema: spellSchemas,
      rootValue: methods,
      graphiql: true,
    }));

    app.listen(4000);
    console.log("Running on PORT 4000");
  } catch(error) {
    console.log("Massive error, guvnah! ", error);
  }
}

export default serve;