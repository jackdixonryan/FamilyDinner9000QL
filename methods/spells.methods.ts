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
      const all = await queries.getMany("spells");
      return all;
    }

    var spellsByClass = async function(args) {
      const argClass = args.class;
      const all = await queries.getWhere("spells", "classes", argClass);
      return all;
    }

    var spellsByClassAndLevel = async function(args) {
      const all = await queries.getWhereClassAndLevel("spells", args.class, args.level);
      return all;
    }

    return {
      spell,
      spells,
      spellsByClass,
      spellsByClassAndLevel
    }
    
  } catch (error) {
    console.log("Error duing method building:", error);
  }
}

export default buildMethods;
