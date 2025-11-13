const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const root = path.resolve(__dirname, '..');

// Services to start (in order). Adjust paths/commands as needed.
const services = [
  {
    name: 'frontend',
    cwd: path.join(root, 'frontend'),
    cmd: fs.existsSync(path.join(root, 'frontend', 'package.json')) ? 'npm' : 'npx',
    args: fs.existsSync(path.join(root, 'frontend', 'package.json')) ? ['run', 'dev'] : ['next', 'dev'],
    env: { PORT: '3000' }
  },
  {
    name: 'admin-ui',
    cwd: path.join(root, 'frontend'),
    cmd: 'npx',
    args: ['next', 'dev', '-p', '4000'],
    env: { PORT: '4000' }
  },
  {
    name: 'backend',
    cwd: path.join(root, 'backend'),
    cmd: 'npm',
    args: ['run', 'dev']
  },
  {
    name: 'ai_service',
    cwd: path.join(root, 'ai_service'),
    type: 'python',
    pythonEntry: 'app.py'
  }
];

function prefixStream(stream, prefix) {
  stream.on('data', (chunk) => {
    const lines = chunk.toString().split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      console.log(`[${prefix}] ${line}`);
    }
  });
}

function startService(svc) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(svc.cwd)) {
      console.log(`Skipping ${svc.name} — folder not found: ${svc.cwd}`);
      return resolve();
    }

    if (svc.type === 'python') {
      // ensure venv exists
      const isWin = process.platform === 'win32';
      const venvDir = path.join(svc.cwd, '.venv');
      const pythonCmd = isWin ? 'py' : 'python3';

      if (!fs.existsSync(venvDir)) {
        try {
          console.log(`Creating python venv for ${svc.name}...`);
          const venv = spawn(pythonCmd, ['-m', 'venv', '.venv'], { cwd: svc.cwd, stdio: 'inherit' });
          venv.on('exit', (code) => {
            if (code !== 0) {
              console.warn(`Failed to create venv for ${svc.name} (exit ${code}).`);
            }
            runPythonService();
          });
        } catch (err) {
          console.error(`Error creating venv for ${svc.name}:`, err.message || err);
          return resolve();
        }
      } else {
        runPythonService();
      }

      function runPythonService() {
        const pythonExec = isWin ? path.join(svc.cwd, '.venv', 'Scripts', 'python.exe') : path.join(svc.cwd, '.venv', 'bin', 'python');
        if (!fs.existsSync(pythonExec)) {
          console.warn(`Python executable not found at ${pythonExec}. Attempting system python.`);
          const p = spawn(pythonCmd, [svc.pythonEntry], { cwd: svc.cwd });
          prefixStream(p.stdout, svc.name);
          prefixStream(p.stderr, svc.name);
          p.on('exit', () => resolve());
        } else {
          const p = spawn(pythonExec, [svc.pythonEntry], { cwd: svc.cwd });
          prefixStream(p.stdout, svc.name);
          prefixStream(p.stderr, svc.name);
          p.on('exit', () => resolve());
        }
      }

      return;
    }

    const child = spawn(svc.cmd, svc.args, { 
      cwd: svc.cwd, 
      shell: true,
      env: Object.assign({}, process.env, svc.env || {})
    });
    prefixStream(child.stdout, svc.name);
    prefixStream(child.stderr, svc.name);
    child.on('exit', (code) => {
      console.log(`${svc.name} exited with code ${code}`);
      resolve();
    });
  });
}

(async () => {
  console.log('Starting all dev services...');
  for (const svc of services) {
    // start each service without waiting for exit (they run concurrently but sequentially started)
    startService(svc).catch((err) => console.error(`Error starting ${svc.name}:`, err));
    // short delay between starts
    await new Promise((r) => setTimeout(r, 500));
  }
})();
