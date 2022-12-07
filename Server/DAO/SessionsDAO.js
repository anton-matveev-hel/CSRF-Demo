const sessions = {}

module.exports = class SessionsDAO
{

  createSession( accessToken, email )
  {
    sessions[accessToken] = { email }
  }


  getSession( accessToken )
  {
    return sessions[accessToken];
  }
}