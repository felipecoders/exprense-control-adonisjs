"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const UserSpendGroup = use("App/Models/UserSpendGroup");

class SpendGroup extends Model {
  static boot() {
    super.boot();

    /**
     * creating a reference between "user" and "spend-group" in "user-spend-group" after save this register
     */
    this.addHook("afterCreate", async spendGroupInstance => {
      const { user_id, id: spend_group_id } = spendGroupInstance;
      await UserSpendGroup.create({ user_id, spend_group_id, root: true });
    });
  }

  /** oculta o campo que não deve retornar no json para o cliente */
  static get hidden() {
    return ["user_id", "user.name"];
  }

  user() {
    return this.belongsTo("App/Models/User");
  }

  spends() {
    return this.hasMany("App/Models/Spend");
  }
}

module.exports = SpendGroup;
// 1563924164195
// 1563924290693
