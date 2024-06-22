import { $ } from "bun";
import chalk from "chalk";
import { parseArgs } from "util";

const { values, positionals } = parseArgs({
  args: Bun.argv,
  options: {
    service: {
      type: "string",
    },
    mode: {
      type: "string",
      default: "dev",
    },
  },
  strict: true,
  allowPositionals: true,
});

console.log("Values:", values);
console.log("Positionals:", positionals);

console.log(
  chalk.blue(
    `
  )
 (__
 _  )_
(_)_(_)
 (o o)
==\o/==
 `
  )
);
