/// <reference path="../../index.d.ts"/>
"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SpendGroupSchema extends Schema {
  up() {
    this.create(
      "spend_groups",
      /**@param {TableBuilder} table */ table => {
        table.increments();
        table.string("name", 40);
        table
          .integer("user_id")
          .unsigned()
          .references("id")
          .inTable("users")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table.timestamps();
      }
    );
  }

  down() {
    this.drop("spend_groups");
  }
}

module.exports = SpendGroupSchema;
