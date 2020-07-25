"use strict";

import spellSchemas from "../schemas/spell.schema";

// Sub out strings for methods to call db functions
async function buildMethods(queries) {
  try {
    var spell = async function(args) {
      const slug = args.slug;
      const spell = await queries.getWhere("spells", "slug", slug);
      return spell;
    }

    var spells = async function(args) {
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
