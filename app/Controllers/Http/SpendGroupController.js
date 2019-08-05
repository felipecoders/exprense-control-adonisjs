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
      // .where({
      //   user_id: id
      // })
      .select("spend_groups.*", "user_spend_groups.root")
      .with("user", builder => {
        /** é obrigado a possuir o campo ID */
        builder.select("id", "name", "last_name");
      })
      .leftJoin("user_spend_groups", function() {
        this.on({
          "spend_groups.id": "user_spend_groups.spend_group_id",
          "spend_groups.user_id": id
        });
      })
      .whereExists(function() {
        this.select("*")
          .from("user_spend_groups")
          .whereRaw("spend_groups.id = user_spend_groups.spend_group_id")
          .andWhereRaw("spend_groups.user_id = user_spend_groups.user_id");
      })
      .fetch();

    return spendGroups.rows.map(group => {
      if (!group.root) {
        group.root = undefined;
      }
      return group;
    });
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
   * @param {Response} ctx.response
   * @param {AuthSession} ctx.auth
   */
  async show({ params, response, auth }) {
    try {
      const { id } = auth.user;
      const spendGroup = await SpendGroup.query()
        .select("spend_groups.*", "user_spend_groups.root")
        .with("user")
        .leftJoin("user_spend_groups", function() {
          this.on({
            "spend_groups.id": "user_spend_groups.spend_group_id",
            "spend_groups.user_id": id
          });
        })
        .whereExists(function() {
          this.select("*")
            .from("user_spend_groups")
            .whereRaw("spend_groups.id = user_spend_groups.spend_group_id")
            .andWhereRaw("spend_groups.user_id = user_spend_groups.user_id");
        })
        .andWhereRaw(`spend_groups.id = ${params.id}`)
        .firstOrFail();

      if (!spendGroup.root) {
        spendGroup.root = undefined;
      }

      return spendGroup;
    } catch (e) {
      console.log(e);
      return response.status(404).send({
        message: "Page not found"
      });
    }
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
      return response.status(403).send({
        message: "Permission denied"
      });
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
   * @param {AuthSession} ctx.auth
   */
  async destroy({ params, request, response, auth }) {
    const spendGroup = await SpendGroup.findOrFail(params.id);
    if (spendGroup.user_id !== auth.user.id) {
      return response.status(403).send({
        message: "Permission denied"
      });
    }

    await spendGroup.delete();
  }
}

module.exports = SpendGroupController;
