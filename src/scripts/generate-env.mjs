import { writeFileSync, mkdirSync } from 'fs';

const email = process.env.EMAIL || 'bradleyjmonroe@gmail.com';
mkdirSync('src/environments', { recursive: true });

const content = `export const environment = {
  production: true,
  email: '${email}'
};
`;
writeFileSync('src/environments/environment.prod.ts', content);
console.log('Wrote src/environments/environment.prod.ts with EMAIL:', email);
