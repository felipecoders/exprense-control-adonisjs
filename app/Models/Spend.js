"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const Database = use("Database");

class Spend extends Model {
  static get hidden() {
    return ["spend_group_id"];
  }

  group() {
    return this.belongsTo("App/Models/SpendGroup").select("id", "name");
  }

  checkGroup() {
    return this.manyThrough("App/Models/UserSpendGroup", "spendGroups");
  }
}

module.exports = Spend;
