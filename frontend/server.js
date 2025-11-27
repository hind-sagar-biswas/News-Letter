/* eslint-disable @typescript-eslint/no-require-imports */
const { createServer } = require("http");
const next = require("next");
const { URL } = require("url");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const parsedUrl = {
      pathname: url.pathname,
      query: Object.fromEntries(url.searchParams),
      search: url.search,
      hash: url.hash,
      href: url.href,
      origin: url.origin,
      host: url.host,
      hostname: url.hostname,
      port: url.port,
      protocol: url.protocol,
    };
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});