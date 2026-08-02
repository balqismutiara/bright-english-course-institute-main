import { spawn } from 'child_process';

const child = spawn(process.execPath, ['--loader', 'tsx', 'server.ts'], {
  stdio: 'inherit',
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});

child.on('error', (error) => {
  console.error('Failed to start server using tsx loader:', error);
  process.exit(1);
});

process.on('SIGINT', () => child.kill('SIGINT'));
process.on('SIGTERM', () => child.kill('SIGTERM'));
