import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import process from "node:process";
import { fileURLToPath } from "node:url";
import test from "node:test";

const helperPath = fileURLToPath(new URL("./helper.js", import.meta.url));

test("API helper parses as a single JavaScript module", () => {
  const result = spawnSync(process.execPath, ["--check", helperPath], {
    encoding: "utf8",
  });

  assert.equal(result.status, 0, result.stderr);
});
