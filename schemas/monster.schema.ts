"use strict";

const monsterSchema = `

  type Mutation {
    addMonsters(monsters: [Monster]): Int
  }

  type Monster {
    id: String,
    slug: String,
    size: String,
    type: String,
    subtype: String,
    group: String,
    alignment: String,
    armor_class: Int,
    armor_desc: String,
    hit_points: Int,
    hit_dice: String,
    speed: Speeds,
    strength: Int,
    dexterity: Int,
    constitution: Int,
    intelligence: Int,
    wisdom: Int,
    charisma: Int,
    strength_save: String,
    dexterity_save: String,
    constitution_save: String,
    intelligence_save: String,
    wisdom_save: String,
    perception: String,
    skills: Skills,
    damage_vulnerabilities: String,
    damage_resistances: String,
    damage_immunities: String,
    condition_immunities: String,
    senses: String,
    languages: String,
    challenge_rating: String,
    actions: [Action],
    reactions: String,
    legendary_desc: String,
    legendary_actions: [Action],
    special_abilities: [Action],
    spell_list: [Spell],
    img_main: String,
    document__slug: String,
    document__title: String,
    document__license_url: String,
  }

  type Speeds {
    walk: Int
  }

`;

export default monsterSchema;