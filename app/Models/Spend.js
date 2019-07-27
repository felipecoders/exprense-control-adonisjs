"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Spend extends Model {
  spendGroups() {
    return this.hasOne("App/Models/SpendGroup");
  }
}

module.exports = Spend;
