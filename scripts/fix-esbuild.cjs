const fs = require('fs');
const path = require('path');

const candidates = [
  'node_modules/@esbuild/linux-x64/bin/esbuild',
  'node_modules/@esbuild/linux-arm64/bin/esbuild',
  'node_modules/@esbuild/darwin-x64/bin/esbuild',
  'node_modules/@esbuild/darwin-arm64/bin/esbuild',
  'node_modules/@esbuild/win32-x64/esbuild.exe',
  'node_modules/esbuild/bin/esbuild',
];

for (const file of candidates) {
  try {
    const full = path.join(process.cwd(), file);
    if (fs.existsSync(full)) {
      fs.chmodSync(full, 0o755);
      console.log('fix-esbuild: chmod +x', file);
    }
  } catch (err) {
    console.warn('fix-esbuild:', file, err.message);
  }
}
