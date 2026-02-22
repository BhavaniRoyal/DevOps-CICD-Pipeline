// Super-light "lint" to keep the demo dependency-free.
// Fails if files contain tabs or trailing whitespace.
const fs = require("node:fs");
const path = require("node:path");

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.isFile() && p.endsWith(".js")) checkFile(p);
  }
}

function checkFile(file) {
  const txt = fs.readFileSync(file, "utf8");
  const lines = txt.split(/\r?\n/);
  lines.forEach((line, i) => {
    if (/\t/.test(line)) {
      console.error(`${file}:${i + 1} contains a tab character`);
      process.exit(1);
    }
    if (/\s+$/.test(line)) {
      console.error(`${file}:${i + 1} has trailing whitespace`);
      process.exit(1);
    }
  });
}

walk(path.join(process.cwd(), "src"));
console.log("lint ok");
