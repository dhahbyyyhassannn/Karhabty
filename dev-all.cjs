const { spawn } = require('child_process');
const path = require('path');

function startProcess(label, command, args, cwd) {
  const child = spawn(command, args, {
    cwd,
    stdio: 'inherit',
    shell: true,
  });

  child.on('exit', (code) => {
    if (code && code !== 0) {
      console.error(`${label} exited with code ${code}`);
      process.exitCode = code;
    }
  });

  return child;
}

const root = __dirname;
const backend = path.join(root, 'karhabty_backend');

startProcess('laravel', 'php', ['artisan', 'serve', '--port=8000'], backend);
startProcess('react', 'npm', ['start'], root);
