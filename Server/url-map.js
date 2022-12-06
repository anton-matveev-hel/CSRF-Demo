const FileRequestHandler = require("./RequestHandlers/FileRequestHandler");

const INDEX_PATH = "/static/index/index.html";
const LOGIN_PATH = "/static/login/login.html"
const fileRequestHandler = new FileRequestHandler();

module.exports = {
  "/": req => fileRequestHandler.serveFile(req, INDEX_PATH),
  "/login": req => fileRequestHandler.serveFile(req, LOGIN_PATH)
};



