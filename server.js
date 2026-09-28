const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const DOCS = ['README.md', 'AGENT-spec.md', 'linkedin-work.md'];
const TYPES = { '.html': 'text/html; charset=utf-8', '.md': 'text/markdown; charset=utf-8', '.json': 'application/json' };

function send(res, status, body, type = 'text/plain; charset=utf-8') {
  res.writeHead(status, { 'Content-Type': type });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === '/') {
    return fs.readFile(path.join(ROOT, 'public', 'index.html'), (err, data) =>
      err ? send(res, 500, 'Missing public/index.html') : send(res, 200, data, TYPES['.html']));
  }
  if (url.pathname === '/api/docs') {
    return send(res, 200, JSON.stringify(DOCS), TYPES['.json']);
  }
  if (url.pathname.startsWith('/docs/')) {
    const name = decodeURIComponent(url.pathname.slice('/docs/'.length));
    if (!DOCS.includes(name)) return send(res, 404, 'Not found');
    return fs.readFile(path.join(ROOT, name), (err, data) =>
      err ? send(res, 404, 'Not found') : send(res, 200, data, TYPES['.md']));
  }
  send(res, 404, 'Not found');
});

server.listen(PORT, () => console.log(`Agent-control running at http://localhost:${PORT}`));
