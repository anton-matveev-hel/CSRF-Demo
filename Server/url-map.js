const FileRequestHandler = require("./RequestHandlers/FileRequestHandler");
const AuthRequestHandler = require("./RequestHandlers/AuthRequestHandler");
const AccountRequestHandler = require("./RequestHandlers/AccountRequestHandler");
const UsersRequestHandler = require("./RequestHandlers/UsersRequestHandler");
const TransfersRequestHandler = require("./RequestHandlers/TransfersRequestHandler");
const UserNameRequestHandler = require("./RequestHandlers/UserNameRequestHandler");

const INDEX_PATH = "/static/index/index.html";
const LOGIN_PATH = "/static/login/login.html";

const fileRequestHandler = new FileRequestHandler();
const authRequestHandler = new AuthRequestHandler();
const accountRequestHandler = new AccountRequestHandler();
const usersRequestHandler = new UsersRequestHandler();
const transfersRequestHandler = new TransfersRequestHandler();
const userNameRequestHandler = new UserNameRequestHandler();

module.exports = {
  "/": req => fileRequestHandler.serveFile(req, INDEX_PATH),
  "/login": req => fileRequestHandler.serveFile(req, LOGIN_PATH),
  "/auth": req => authRequestHandler.handle(req),
  "/account": req => accountRequestHandler.handle(req),
  "/users": req => usersRequestHandler.handle(req),
  "/transfers": req => transfersRequestHandler.handle(req),
  "/user/name": req => userNameRequestHandler.handle(req)
};



