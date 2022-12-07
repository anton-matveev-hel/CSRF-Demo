const http = require("http");
const url = require("url");
const FileRequestHandler = require("./Server/RequestHandlers/FileRequestHandler");
const urlMap = require("./Server/url-map");

const PORT = 8000;
const fileRequestHandler = new FileRequestHandler();
http.createServer(async (req, res) => {
  const path = url.parse(req.url).pathname;
  let response;
  if(path.startsWith("/static/"))
  {
    response = await fileRequestHandler.serveFile(req, path);
  }
  else if(typeof urlMap[path] === "function")
  {
    response = await urlMap[path](req);
  }
  else
  {
    response = { status : 404 };
  }

  writeResponse(res, response);
}).listen(PORT);

function writeResponse( res, response )
{
  res.statusCode = response.status ?? 200;
  if( response.headers )
  {
    Object.keys(response.headers).forEach( header => res.setHeader(header, response.headers[header]));
  }
  if(response.body)
  {
    if(response.type === "json")
    {
      res.write(JSON.stringify(response.body));
      res.setHeader("Content-Type", "application/json");
    }
    else
    {
      res.write(response.body);
    }
  }
  res.end();
}