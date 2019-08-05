"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */

const UserSpendGroup = use("App/Models/UserSpendGroup");

/**
 * Resourceful controller for interacting with userspendgroups
 */
class UserSpendGroupController {
  /**
   * Show a list of all userspendgroups.
   * GET userspendgroups
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {AuthSession} ctx.auth
   * @param {View} ctx.view
   */
  async index({ auth }) {
    const { id } = auth.user;
    const userSpendGroup = UserSpendGroup.query()
      // .where("user_id", id)
      .with("spends")
      .fetch();

    return userSpendGroup;
  }

  /**
   * Create/save a new userspendgroup.
   * POST userspendgroups
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.all();
    const userSpendGroup = await UserSpendGroup.create({
      ...data,
      // root false pois o usuario inserido aqui foi convidado
      root: false
    });
    return userSpendGroup;
  }

  /**
   * Display a single userspendgroup.
   * GET userspendgroups/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Update userspendgroup details.
   * PUT or PATCH userspendgroups/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a userspendgroup with id.
   * DELETE userspendgroups/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = UserSpendGroupController;
