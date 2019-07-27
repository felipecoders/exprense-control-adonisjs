"use strict";

const User = use("App/Models/User");

class UserController {
  /**
   *
   * @param {Object} ctx
   * @param {Request} ctx.request
   * @param {AuthSession} ctx.auth
   */
  async create({ request }) {
    const data = request.only([
      "email",
      "password",
      "phone",
      "name",
      "last_name"
    ]);
    const user = await User.create(data);
    return user;
  }
}

module.exports = UserController;
