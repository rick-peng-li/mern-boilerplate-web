import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log('__dirname:', __dirname);
console.log('join result:', join(dirname(dirname(__dirname)), 'server', 'public/images'));
