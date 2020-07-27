"use strict";

const actionSchema = `
  type Action {
    attack_bonus: Int,
    damage_dice: String,
    damage_bonus: Int,
    desc: String,
    name: String
  }
`;

export default actionSchema;