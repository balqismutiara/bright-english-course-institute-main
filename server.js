import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const compiledEntry = path.join(__dirname, 'dist-server', 'server.js');
const usesCompiled = fs.existsSync(compiledEntry);

const args = usesCompiled
  ? [compiledEntry]
  : ['--import', 'tsx', 'server.ts'];

const child = spawn(process.execPath, args, {
  stdio: 'inherit',
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});

child.on('error', (error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

process.on('SIGINT', () => child.kill('SIGINT'));
process.on('SIGTERM', () => child.kill('SIGTERM'));
