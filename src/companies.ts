import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { CompanyConfig } from "./types.js";

const COMPANIES_DIR = join(process.cwd(), "config", "companies");

export function loadCompanyConfigs(): CompanyConfig[] {
  const files = readdirSync(COMPANIES_DIR).filter((f) => f.endsWith(".json"));
  return files.map((file) => {
    const raw = readFileSync(join(COMPANIES_DIR, file), "utf-8");
    return JSON.parse(raw) as CompanyConfig;
  });
}
