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
    if(req.method !== "POST")
    {
      return { status : 400 };
    }
    try
    {
      const body = await readRequestBody(req);
      const payload = JSON.parse(body.toString());
      if(payload.email && payload.password)
      {
        const accessToken = this.sessionManager.createSession(payload.email, payload.password);
        if(accessToken)
        {
          return {
            status: 200,
            headers: {
              "Set-Cookie": `${this.sessionManager.ACCESS_TOKEN_COOKIE}=${accessToken}`
            }
          };
        }

        return { status: 401 };
      }
      else
      {
        return { status: 400, type: "json", body: {message: "Missing parameters in request body."}};
      }
    }
    catch(e)
    {
      return { status: 400};
    }
  }
}