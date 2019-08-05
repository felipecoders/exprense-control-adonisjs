"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */

const Spend = use("App/Models/Spend");
const UserSpendGroup = use("App/Models/UserSpendGroup");

async function getPermissionByUserSpendGroup({ spend_group_id, user_id }) {
  const [userSpendGroup] = await UserSpendGroup.query()
    .where({ spend_group_id, user_id })
    .count("id");

  return Number(userSpendGroup.count) === 0;
}

/**
 * Resourceful controller for interacting with spends
 */
class SpendController {
  /**
   * Show a list of all spends.
   * GET spends
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {AuthSession} ctx.auth
   */
  async index({ auth }) {
    const { id } = auth.user;
    const spend = await Spend.query()
      .select("spends.*")
      // adicionando as tabelas a serem utilizadas na query
      .from({
        spends: "spends",
        spend_groups: "spend_groups",
        user_spend_groups: "user_spend_groups"
      })
      // adicinando o grupo
      .with("group")
      // WHERE sem replace
      .whereRaw(`user_spend_groups.user_id = ${id}`)
      // AND sem replace
      .andWhereRaw("user_spend_groups.spend_group_id = spend_groups.id")
      .andWhereRaw("spends.spend_group_id= spend_groups.id")
      // agrupa para evitar muitos registros
      .groupBy("spends.id")
      .fetch();
    return spend;
  }

  /**
   * Create/save a new spend.
   * POST spends
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {AuthSession} ctx.auth
   */
  async store({ request, response, auth }) {
    const { id } = auth.user;
    const data = request.all();

    const permissionParams = {
      spend_group_id: data.spend_group_id,
      user_id: id
    };

    if (await getPermissionByUserSpendGroup(permissionParams)) {
      return response.status(403).send({
        message: "permission denied"
      });
    }

    const spend = await Spend.create({ ...data });

    return spend;
  }

  /**
   * Display a single spend.
   * GET spends/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {AuthSession} ctx.auth
   */
  async show({ params, response, auth }) {
    const spend = await Spend.query()
      .where("id", params.id)
      .with("group")
      .firstOrFail();

    const { spend_group_id } = spend["$originalAttributes"];
    const { id } = auth.user;

    const permissionParams = {
      spend_group_id,
      user_id: id
    };

    if (await getPermissionByUserSpendGroup(permissionParams)) {
      return response.status(404).send({
        message: "Page not found"
      });
    }

    return spend;
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
    const { id } = auth.user;
    const spend = await Spend.findOrFail(params.id);
    const data = request.only(["description", "value"]);

    const permissionParams = {
      spend_group_id: spend["$originalAttributes"].spend_group_id,
      user_id: id
    };

    if (await getPermissionByUserSpendGroup(permissionParams)) {
      return response.status(403).send({
        message: "Permission denied"
      });
    }

    spend.merge(data);
    // save register
    await spend.save();
    // return current register
    return spend;
  }

  /**
   * Delete a spend with id.
   * DELETE spends/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {AuthSession} ctx.auth
   */
  async destroy({ params, response, auth }) {
    const { id } = auth.user;
    const spend = await Spend.findOrFail(params.id);

    const permissionParams = {
      spend_group_id: spend["$originalAttributes"].spend_group_id,
      user_id: id
    };

    if (await getPermissionByUserSpendGroup(permissionParams)) {
      return response.status(403).send({
        message: "Permission denied"
      });
    }

    await spend.delete();
  }
}

module.exports = SpendController;
