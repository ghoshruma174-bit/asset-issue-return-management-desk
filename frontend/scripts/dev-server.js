import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { extname, join } from 'path';

const root = process.cwd();
const defaultPort = process.env.PORT ? Number(process.env.PORT) : 5173;
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
};

const server = createServer(async (req, res) => {
  try {
    let url = req.url.replace(/\?.*$/, '');
    if (url === '/') url = '/src/index.html';
    const filePath = join(root, url);
    const content = await readFile(filePath);
    const ext = extname(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    res.end(content);
  } catch (err) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found: ' + err.message);
  }
});

function tryListen(port) {
  server.listen(port, () => {
    console.log(`Dev server running at http://localhost:${port}`);
  });
}

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    const nextPort = defaultPort + 1;
    console.warn(`Port ${defaultPort} in use, trying ${nextPort}`);
    tryListen(nextPort);
  } else {
    console.error('Server error:', error);
    process.exit(1);
  }
});

tryListen(defaultPort);
