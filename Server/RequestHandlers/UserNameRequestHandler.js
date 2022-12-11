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
      if(req.method === "POST")
      {
        const body = await readRequestBody(req);
        const payload = JSON.parse(body);
        if(payload.name)
        {
          return this.changeName(session.email, payload.name);
        }
        else
        {
          return { status: 400 };
        }
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

  async changeName(email, name)
  {
    this.usersDao.setName(email, name);
    return { status: 200 };
  }
}