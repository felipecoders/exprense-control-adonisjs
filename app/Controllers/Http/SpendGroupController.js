"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */

const SpendGroup = use("App/Models/SpendGroup");

/**
 * Resourceful controller for interacting with spendgroups
 */
class SpendGroupController {
  /**
   * Show a list of all spendgroups.
   * GET spendgroups
   *
   * @param {object} ctx
   * @param {AuthSession} ctx.auth
   */
  async index({ auth }) {
    const { id } = auth.user;
    const spendGroups = await SpendGroup.query()
      .where({
        user_id: id
      })
      .with("user", builder => {
        /** é obrigado a possuir o campo ID */
        builder.select("id", "name", "last_name");
      })
      .fetch();
    return spendGroups;
  }

  /**
   * Create/save a new spendgroup.
   * POST spendgroups
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {AuthSession} ctx.auth
   */
  async store({ request, auth }) {
    const { id } = auth.user;
    const data = request.only(["name"]);

    const spendGroup = await SpendGroup.create({ ...data, user_id: id });

    return spendGroup;
  }

  /**
   * Display a single spendgroup.
   * GET spendgroups/:id
   *
   * @param {object} ctx
   * @param {AuthSession} ctx.auth
   */
  async show({ params, auth }) {
    const { id } = auth.user;
    const spendGroup = await SpendGroup.query()
      .where({
        id: params.id,
        user_id: id
      })
      .with("user")
      .firstOrFail();
    return spendGroup;
  }

  /**
   * Update spendgroup details.
   * PUT or PATCH spendgroups/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {AuthSession} ctx.auth
   */
  async update({ params, request, response, auth }) {
    // get register
    const spendGroup = await SpendGroup.findOrFail(params.id);
    // get new name
    const data = request.only(["name"]);
    // valid register by user
    if (spendGroup.user_id !== auth.user.id) {
      return response.status(401);
    }
    // apply change name
    spendGroup.merge(data);
    // save register
    await spendGroup.save();
    // return current register
    return spendGroup;
  }

  /**
   * Delete a spendgroup with id.
   * DELETE spendgroups/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = SpendGroupController;
