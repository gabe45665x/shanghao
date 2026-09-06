import http from "node:http";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 8787);
const HOST = process.env.HOST || "0.0.0.0";

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".mp4": "video/mp4",
  ".webm": "video/webm"
};

function isBlocked(rel) {
  const n = rel.replace(/\\/g, "/").toLowerCase();
  return n.includes("/_source/") || n.startsWith("_source/") || n.includes("/.git/");
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  let rel = decodeURIComponent(url.pathname);
  if (rel === "/") rel = "/index.html";
  if (rel.endsWith("/")) rel += "index.html";

  const full = path.normalize(path.join(ROOT, rel));
  if (!full.startsWith(ROOT) || isBlocked(rel)) {
    res.writeHead(403).end("Forbidden");
    return;
  }

  fs.stat(full, (err, st) => {
    if (err) {
      res.writeHead(404, { "content-type": "text/plain; charset=utf-8" }).end("Not found");
      return;
    }
    const target = st.isDirectory() ? path.join(full, "index.html") : full;
    const ext = path.extname(target).toLowerCase();
    res.writeHead(200, {
      "content-type": TYPES[ext] || "application/octet-stream",
      "cache-control": ext === ".html" ? "no-cache" : "public, max-age=120",
      "access-control-allow-origin": "*"
    });
    fs.createReadStream(target).on("error", () => {
      if (!res.headersSent) res.writeHead(404).end("Not found");
    }).pipe(res);
  });
});

server.listen(PORT, HOST, () => {
  const nets = os.networkInterfaces();
  const lan = [];
  for (const addrs of Object.values(nets)) {
    for (const a of addrs || []) {
      if (a.family === "IPv4" && !a.internal) lan.push(a.address);
    }
  }
  console.log(`TAIWAN 本機  http://127.0.0.1:${PORT}/`);
  lan.forEach((ip) => console.log(`TAIWAN 區網  http://${ip}:${PORT}/`));
  console.log("對手機／公共網路：請再跑 公開預覽.bat 或看 README 的 GitHub Pages 連結。");
});
