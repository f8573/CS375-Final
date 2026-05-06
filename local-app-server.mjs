import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = Number(process.env.APP_PORT || 5174);
const apiOrigin = process.env.API_ORIGIN || "http://localhost:3000";
const clientDir = path.join(__dirname, "client");

const contentTypes = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8"
};

function sendFile(res, filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const stream = fs.createReadStream(filePath);
    res.writeHead(200, { "Content-Type": contentTypes[ext] || "application/octet-stream" });
    stream.pipe(res);
}

function proxyRequest(req, res) {
    const target = new URL(req.url, apiOrigin);
    const proxy = http.request(target, {
        method: req.method,
        headers: req.headers
    }, (proxyRes) => {
        res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
        proxyRes.pipe(res);
    });

    proxy.on("error", () => {
        res.writeHead(502, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({ message: "Unable to reach backend API" }));
    });

    req.pipe(proxy);
}

const server = http.createServer((req, res) => {
    const requestUrl = new URL(req.url, `http://${req.headers.host}`);

    if (requestUrl.pathname.startsWith("/api/")) {
        proxyRequest(req, res);
        return;
    }

    const relativePath = requestUrl.pathname === "/"
        ? "index.html"
        : requestUrl.pathname.replace(/^\/+/, "");
    const filePath = path.normalize(path.join(clientDir, relativePath));

    if (!filePath.startsWith(clientDir)) {
        res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Forbidden");
        return;
    }

    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Not found");
        return;
    }

    sendFile(res, filePath);
});

server.listen(port, "127.0.0.1", () => {
    console.log(`App server running at http://localhost:${port}`);
});
