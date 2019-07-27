"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class SpendGroup extends Model {
  /** oculta o campo que não deve retornar no json para o cliente */
  static get hidden() {
    return ["user_id", "user.name"];
  }
  user() {
    return this.belongsTo("App/Models/User");
  }
}

module.exports = SpendGroup;
// 1563924164195
// 1563924290693
