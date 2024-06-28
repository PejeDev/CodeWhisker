import { $ } from "bun";
import { logger } from "../utils/logger";

export async function runVMCompose(path: string) {
  try {
    const isDocker = await isDockerInstalled();
    const isPodmanCompose = await isPodmanComposeInstalled();

    if (!isDocker && !isPodmanCompose) {
      logger.error(
        "🔥 Docker or Podman Compose is required to run this command"
      );
      process.exit();
    }
    const command = isDocker ? "docker compose" : "docker-compose";

    logger.info(`🚀 Running VM development containers`);
    const { stderr } =
      await $`${command} --file ${path} up --detach --remove-orphans`.quiet();

    logger.info(stderr.toString());
  } catch (error) {
    logger.error("🔥 Error running VM development containers");
    logger.error(error);
    process.exit();
  }
}

export async function isDockerInstalled() {
  try {
    await $`docker --version`.quiet();
    return true;
  } catch (error) {
    return false;
  }
}

export async function isPodmanInstalled() {
  try {
    await $`podman --version`.quiet();
    return true;
  } catch (error) {
    return false;
  }
}

export async function isPodmanComposeInstalled() {
  try {
    await $`podman compose version`.quiet();
    return true;
  } catch (error) {
    return false;
  }
}
