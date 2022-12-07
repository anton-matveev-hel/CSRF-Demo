const SessionManager = require("../Util/SessionManager");
const { readRequestBody } = require("../Util/request-util");

module.exports = class AuthRequestHandler
{
  constructor(args)
  {
    this.sessionManager = new SessionManager();
  }

  async handle(req)
  {
    if(req.method === "POST" )
    {
      try
      {
        const body = await readRequestBody(req);
        const payload = JSON.parse(body.toString());
        if(payload.email && payload.password)
        {
          return this.createSession(payload.email, payload.password)
        }
        else
        {
          return { status: 400, type: "json", body: {message: "Missing parameters in request body."}};
        }
      }
      catch(e)
      {
        return { status: 400 };
      }
    }
    else if(req.method === "GET")
    {
      return this.retrieveSession(req);
    }
    else
    {
      return { status: 400 };
    }
  }

  createSession(email, password)
  {
    const accessToken = this.sessionManager.createSession(email, password);
    if(accessToken)
    {
      return {
        status : 200,
        headers : {
          "Set-Cookie" : `${this.sessionManager.ACCESS_TOKEN_COOKIE}=${accessToken}`
        }
      };
    }
  }

  retrieveSession(req)
  {
    const session = this.sessionManager.verifySession(req);
    if(session)
    {
      return { status : 200, type : "json", body : { email : session.email } };
    }
    else
    {
      return { status : 401 };
    }
  }
}