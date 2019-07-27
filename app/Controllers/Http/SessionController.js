"use strict";

class SessionController {
  /**
   * authenticate and receive JWT token
   * @param {Object} ctx
   * @param {Request} ctx.request
   * @param {AuthSession} ctx.auth
   */
  async create({ request, auth }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);
    return token;
  }
}

module.exports = SessionController;
