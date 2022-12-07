const SessionManager = require("../Util/SessionManager");
const AccountsDAO = require("../DAO/AccountsDAO");
const url = require("url");

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
        const query = url.parse(req.url, true).query;
        if(query.recipient && query.amount)
        {
          return this.makeTransfer(session.email, query.recipient, parseFloat(query.amount));
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

  async makeTransfer(sender, recipient, amount)
  {
    const senderBalance = this.accountsDao.getBalance(sender);
    this.accountsDao.setBalance(sender, senderBalance - amount);
    const recipientBalance = this.accountsDao.getBalance(recipient);
    this.accountsDao.setBalance(recipient, recipientBalance + amount);
    return { status: 200 };
  }
}