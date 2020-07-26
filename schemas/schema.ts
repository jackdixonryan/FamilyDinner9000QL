"use strict";

// eventually, all the schemas will need to be concatenated into a unified schema.
import { buildSchema } from "graphql";
import actionSchema from "./action.schema";
import monsterSchema from "./monster.schema";
import skillsSchema from "./skills.schema";
import spellSchema from "./spell.schema";
import { mergeSchemas } from "@graphql-tools/merge";

async function loadSchemas() {
  try {
    console.log("Creating schemas...");
    const schemas = [
      actionSchema,
      monsterSchema,
      skillsSchema,
      spellSchema,
    ];
    const unifiedSchema = schemas.join("\n");
    const graphQLSchema = buildSchema(unifiedSchema);
    return graphQLSchema;
  } catch(error) {
    console.log("Error while loading schemas! ", error);
  }
}

export default loadSchemas;
