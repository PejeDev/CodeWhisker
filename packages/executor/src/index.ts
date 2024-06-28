import chalk from "chalk";
import { parseArgs } from "util";
import { whiskerOptions } from "./lib/constants";
import {
  WhiskerExecutorInputContext,
  WhiskersExecutorValues,
  type WhiskersExecutorCommandsType,
} from "./lib/types";
import { logger } from "./lib/utils/logger";
import { runService } from "./lib/services";

// Parse cli arguments
const { values, positionals } = parseArgs({
  args: Bun.argv,
  options: whiskerOptions,
  strict: true,
  allowPositionals: true,
});

// Extract project folder
const projectFolder: string = positionals[1].split("/packages/")[0];

// Print program signature
const programSignature = await Bun.file("./src/assets/signature.txt").text();
console.log(chalk.magentaBright(programSignature));

// Validate arguments
const parameters = WhiskersExecutorValues.safeParse(values);
if (!parameters.success) {
  logger.error(parameters.error.errors[0].message);
  process.exit();
}
const { data: parsedParameters } = parameters;

const context = WhiskerExecutorInputContext.safeParse({
  commands: positionals[2] as WhiskersExecutorCommandsType,
  projectFolder,
});

if (!context.success) {
  logger.error(context.error.errors[0].message);
  process.exit();
}

const { data: parsedContext } = context;

// Run service
const service = runService[parsedParameters.service];
await service(parsedContext, parameters.data);
