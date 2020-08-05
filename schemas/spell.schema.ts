"use strict";

const spellSchemas = `
  type Query {
    spell(slug: String, name: String): Spell
    spells(class: String, level: Int, school: String): [Spell]
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
`;

export default spellSchemas;