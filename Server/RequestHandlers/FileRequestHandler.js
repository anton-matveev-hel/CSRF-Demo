const fs = require("fs/promises");
const url = require("url");
const process = require('process');

module.exports = class FileRequestHandler
{
  constructor( args )
  {
    this.NOT_FOUND_PATH = "/static/not-found/not-found.html";
  }

  async serveFile(req, filePath)
  {
    if( req.method !== "GET" )
    {
      return { status: 400 };
    }

    try
    {
      const file = await this.readStaticFile(filePath)
      return { status: 200, body: file };
    }
    catch(e)
    {
      console.error(`Failed to serve file: ${e}`);
      return { status: 404, body: await this.readStaticFile(this.NOT_FOUND_PATH)};
    }
  }

  async readStaticFile( filePath )
  {
    const file = await fs.readFile(process.cwd() + filePath);
    console.log(`Serving static file ${filePath}`);
    return file;
  }
}