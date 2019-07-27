"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSpendGroupSchema extends Schema {
  up() {
    this.create(
      "user_spend_groups",
      /**@param {TableBuilder} table */ table => {
        table.increments();
        table
          .integer("user_id")
          .unsigned()
          .references("id")
          .inTable("users")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table
          .integer("spend_group_id")
          .unsigned()
          .references("id")
          .inTable("spend_groups")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table.timestamps();
      }
    );
  }

  down() {
    this.drop("user_spend_groups");
  }
}

module.exports = UserSpendGroupSchema;
