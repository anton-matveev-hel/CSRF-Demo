const SessionManager = require("../Util/SessionManager");
const UsersDAO = require("../DAO/UsersDAO");
const { readRequestBody } = require("../Util/request-util");

module.exports = class AccountRequestHandler
{
  constructor(args)
  {
    this.sessionManager = new SessionManager();
    this.usersDao = new UsersDAO();
  }

  async handle(req)
  {
    const session = this.sessionManager.verifySession(req);
    if(session)
    {
      if(req.method === "GET")
      {
        return this.getUsers();
      }
      else
      {
        return { status: 400 };
      }
    }
    else
    {
      return { status: 401 };
    }
  }

  async getUsers()
  {
    const users = this.usersDao.getUsers();
    return { status: 200, type: "json", body: { users : users.map( user => ({ email: user.email, name: user.name})) } };
  }
}