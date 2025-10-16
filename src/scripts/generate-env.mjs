// scripts/generate-env.mjs
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 1) Locate and read angular.json from the project root
const angularJsonPath = resolve(__dirname, '..', '..', 'angular.json');
const angular = JSON.parse(readFileSync(angularJsonPath, 'utf8'));
const projectRoot = dirname(angularJsonPath);

// 2) Find a project with production fileReplacements
const [, project] =
  Object.entries(angular.projects).find(([, p]) =>
    p.architect?.build?.configurations?.production?.fileReplacements
  ) ?? [];

if (!project) {
  console.error('[generate-env] Could not find production.fileReplacements in angular.json');
  process.exit(1);
}

const prodCfg = project.architect.build.configurations.production;
const fr = prodCfg.fileReplacements?.[0];

if (!fr?.replace || !fr?.with) {
  console.error('[generate-env] production.fileReplacements is missing/malformed');
  process.exit(1);
}

// 3) Resolve target dir from the project root (NOT from src/)
const replaceAbs = resolve(projectRoot, fr.replace); // e.g. <root>/src/environments/environment.ts
const targetDir  = dirname(replaceAbs);             // e.g. <root>/src/environments

mkdirSync(targetDir, { recursive: true });

// 4) Values
const email = process.env.EMAIL || 'hello@bradmonroe.dev';
const turnstileSecret = process.env.TURNSTILE_SECRET || 'NO_SECRET';
const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY || 'NO_SITE_KEY';

// 5) Write files
const devEnv = `export const environment = {
  production: false,
  email: '${email}',
  turnstileSiteKey: '${turnstileSiteKey}'
};
`;

const prodEnv = `export const environment = {
  production: true,
  email: '${email}',
  turnstileSiteKey: '${turnstileSiteKey}'
};
`;

writeFileSync(resolve(targetDir, 'environment.ts'), devEnv, 'utf8');
writeFileSync(resolve(targetDir, 'environment.prod.ts'), prodEnv, 'utf8');

console.log('[generate-env] Wrote:', resolve(targetDir, 'environment.ts'));
console.log('[generate-env] Wrote:', resolve(targetDir, 'environment.prod.ts'));
console.log('[generate-env] Target dir:', targetDir);
