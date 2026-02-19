import os, { type } from "os";
import path from "path";
import fs from "fs";

export type Config = {
    dbUrl: string;
    currentUserName: string
};


function getConfigFilePath(): string {
    return path.join(os.homedir(), ".gatorconfig.json");
}

function writeConfig(cfg: Config): void {
    fs.writeFileSync(
        getConfigFilePath(),
        JSON.stringify({
            db_url: cfg.dbUrl,
            current_user_name: cfg.currentUserName
        })
    );
}

function validateConfig(rawConfig: any) {
  if (!rawConfig.db_url || typeof rawConfig.db_url !== "string") {
    throw new Error("db_url is required in config file");
  }
  if (
    !rawConfig.current_user_name ||
    typeof rawConfig.current_user_name !== "string"
  ) {
    throw new Error("current_user_name is required in config file");
  }

  const config: Config = {
    dbUrl: rawConfig.db_url,
    currentUserName: rawConfig.current_user_name,
  };

  return config;
}


export function setUser(name: string) {
    const c = readConfig();
    c.currentUserName = name;
    writeConfig(c);
}

export function readConfig(): Config {
    const content = fs.readFileSync(getConfigFilePath(), {
        encoding: "utf-8"
    });
    return validateConfig(JSON.parse(content));
}