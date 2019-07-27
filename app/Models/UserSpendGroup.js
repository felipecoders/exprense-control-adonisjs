"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class UserSpendGroup extends Model {
  users() {
    return this.hasOne("All/Models/User");
  }

  spendGroups() {
    this.hasOne("App/Models/SpendGroup");
  }
}

module.exports = UserSpendGroup;
