#!/usr/bin/env node

import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mode = process.argv[2] ?? "start";
const forwarded = process.argv.slice(3);

const targets = {
  start: ["server/index.mjs"],
  codex: ["scripts/codex-injector.mjs", "--launch", "--watch", "--open", "--port", "9231"],
  inject: ["scripts/codex-injector.mjs", "--watch"],
  daemon: ["scripts/codex-injector.mjs", "--daemon", "--open"],
};

if (!Object.hasOwn(targets, mode)) {
  console.error(`Unknown Operations Center mode: ${mode}`);
  process.exit(2);
}

const env = {
  ...process.env,
  // Safe default for the personal Operations Center profile. LAN access remains
  // available only when the user deliberately bypasses this launcher or sets up
  // a separate explicit LAN workflow.
  CODEX_TASKBOARD_HOST: "127.0.0.1",
};

const child = spawn(process.execPath, [...targets[mode], ...forwarded], {
  cwd: root,
  env,
  stdio: "inherit",
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => child.kill(signal));
}

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exit(code ?? 1);
});
