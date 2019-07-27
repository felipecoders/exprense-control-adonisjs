"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SpendSchema extends Schema {
  up() {
    this.create(
      "spends",
      /**@param {TableBuilder} table */ table => {
        table.increments();
        table.string("description").notNullable();
        table.decimal("value").notNullable();
        table.enu("type", ["money", "credit_card", "debit_card"]).notNullable();
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
    this.drop("spends");
  }
}

module.exports = SpendSchema;
