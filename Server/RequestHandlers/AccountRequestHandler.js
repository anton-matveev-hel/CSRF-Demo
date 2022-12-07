const SessionManager = require("../Util/SessionManager");
const AccountsDAO = require("../DAO/AccountsDAO");
const { readRequestBody } = require("../Util/request-util");

module.exports = class AccountRequestHandler
{
  constructor(args)
  {
    this.sessionManager = new SessionManager();
    this.accountsDao = new AccountsDAO();
  }

  async handle(req)
  {
    const session = this.sessionManager.verifySession(req);
    if(session)
    {
      if(req.method === "GET")
      {
        return this.getAccountInfo(session.email);
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

  async getAccountInfo(email)
  {
    const balance = this.accountsDao.getBalance(email);
    return { status: 200, type: "json", body: { balance } };
  }
}