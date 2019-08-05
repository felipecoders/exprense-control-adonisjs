"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class UserSpendGroup extends Model {
  static get hidden() {
    return ["spend_group_id"];
  }

  users() {
    return this.hasOne("All/Models/User");
  }

  spendGroups() {
    return this.belongsTo("App/Models/SpendGroup");
  }

  spends() {
    return this.manyThrough("App/Models/SpendGroup", "spends");
  }
}

module.exports = UserSpendGroup;
