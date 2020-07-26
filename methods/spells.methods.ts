"use strict";

import spellSchemas from "../schemas/spell.schema";

// Sub out strings for methods to call db functions
async function buildMethods(queries) {
  try {
    var spell = async function(args) {
      const slug = args.slug;
      const spells = await queries.getWhere("spells", "slug", slug);
      return spells[0];
    }

    var spells = async function(args) {
      if (args.level != null && args.class != null) {
        return await queries.getWhereClassAndLevel("spells", args.class, args.level);
      }
      else if (args.class != null) {
        return await queries.getWhere("spells", "classes", args.class);
      }
      const all = await queries.getMany("spells");
      return all;
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
