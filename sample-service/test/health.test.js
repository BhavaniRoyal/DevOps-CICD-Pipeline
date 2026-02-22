const test = require("node:test");
const assert = require("node:assert/strict");
const http = require("node:http");
const { spawn } = require("node:child_process");

test("GET /health returns ok", async (t) => {
  const child = spawn("node", ["src/server.js"], {
    cwd: process.cwd(),
    env: { ...process.env, PORT: "3100" },
    stdio: "ignore",
  });

  t.after(() => child.kill("SIGKILL"));

  await new Promise((r) => setTimeout(r, 300));

  const body = await new Promise((resolve, reject) => {
    http.get("http://127.0.0.1:3100/health", (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => resolve({ statusCode: res.statusCode, data }));
    }).on("error", reject);
  });

  assert.equal(body.statusCode, 200);
  const parsed = JSON.parse(body.data);
  assert.equal(parsed.status, "ok");
});
