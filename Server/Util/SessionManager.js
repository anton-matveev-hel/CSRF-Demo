const crypto = require("crypto");
const UsersDao = require("../DAO/UsersDAO");
const SessionsDao = require("../DAO/SessionsDAO");

module.exports = class SessionManager
{
  constructor(args)
  {
    this.ACCESS_TOKEN_COOKIE = "access_token";
    this.usersDao = new UsersDao();
    this.sessionsDao = new SessionsDao();
  }

  createSession(email, password)
  {
    const user = this.usersDao.getUser(email);
    const hash = crypto.createHash("sha256", password).digest("hex");
    if(user && hash === user.passwordHash)
    {
      const accessToken = crypto.randomBytes(32).toString('hex');
      this.sessionsDao.createSession(accessToken, email);
      return accessToken;
    }
  }

  verifySession(req)
  {
    const accessToken = req.cookies[this.ACCESS_TOKEN_COOKIE];
    if(accessToken)
    {
      return this.sessionsDao.getSession(accessToken);
    }
  }

}