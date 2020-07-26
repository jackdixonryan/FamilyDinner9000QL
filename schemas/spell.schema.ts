"use strict";

import { buildSchema } from "graphql";

const spellSchemas = buildSchema(`
  type Query {
    spell(slug: String!): Spell
    spells(slug: String): [Spell]
    spellsByClass(class: String!): [Spell]
    spellsByClassAndLevel(class: String!, level: Int!): [Spell]
  }

  type Spell {
    id: String,
    slug: String,
    name: String,
    desc: String,
    higher_level: String,
    page: Int,
    range: String,
    components: [String],
    material: String,
    ritual: Boolean,
    duration: String,
    concentration: Boolean,
    casting_time: String,
    level: Int,
    school: String,
    classes: [String],
    archetype: String,
    circles: String
  }
`);

export default spellSchemas;