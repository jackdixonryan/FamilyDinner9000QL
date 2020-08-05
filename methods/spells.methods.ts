"use strict";

import spellSchemas from "../schemas/spell.schema";

// Sub out strings for methods to call db functions
async function buildMethods(queries) {
  try {
    var spell = async function(args) {
      if (args.slug != null){
        const spells = await queries.getWhere("spells", "slug", args.slug);
        return spells[0];
      }
      else if (args.name != null) {
        const spells = await queries.getWhere("spells", "name", args.name);
        return spells[0];
      }
      console.log("No paraeter given. Doing nothing.")
    }

    var spells = async function(args) {
      const query = {};

      if (args.school !=null) {
        query["school"] = args.school;
      }
      if (args.level != null) {
        query["level"] = { $lte: args.level };
      }
      else if (args.class != null) {
        query["classes"] = args.class;
      }
      
      return await queries.getQuery("spells", query);
    }

    return {
      spell,
      spells
    }
    
  } catch (error) {
    console.log("Error duing method building:", error);
  }
}

export default buildMethods;
