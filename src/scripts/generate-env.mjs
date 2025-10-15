import { writeFileSync, mkdirSync } from 'fs';

const email = process.env.EMAIL || 'bradleyjmonroe@gmail.com';
mkdirSync('src/env', { recursive: true });

const content = `export const environment = {
  production: true,
  email: '${email}'
};
`;
writeFileSync('src/env/environment.prod.ts', content);
console.log('Wrote src/env/environment.prod.ts with EMAIL:', email);
