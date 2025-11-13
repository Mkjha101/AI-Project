const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const root = path.resolve(__dirname, '..');

// list subprojects in the order you want them installed
const projects = [
  'frontend',
  'backend',
  'ai_service' // update/add any other folders here
];

function run(cmd, cwd) {
  console.log(`\n> [${path.relative(root, cwd)}] $ ${cmd}`);
  execSync(cmd, { stdio: 'inherit', cwd });
}

(async () => {
  try {
    // ensure root devDependencies (concurrently) are installed
    if (fs.existsSync(path.join(root, 'package.json'))) {
      console.log('\nInstalling root dependencies...');
      run('npm install', root);
    }

    for (const p of projects) {
      const pdir = path.join(root, p);
      if (!fs.existsSync(pdir)) {
        console.log(`\nSkipping ${p} — folder not found`);
        continue;
      }

      // Node project?
      if (fs.existsSync(path.join(pdir, 'package.json'))) {
        console.log(`\nInstalling npm dependencies in ${p}...`);
        run('npm install', pdir);
        continue;
      }

      // Python project?
      if (fs.existsSync(path.join(pdir, 'requirements.txt'))) {
        console.log(`\nSetting up Python venv for ${p}...`);
        const isWin = process.platform === 'win32';
        const pyCmd = isWin ? 'py -3' : 'python3';
        // create venv
        try {
          run(`${pyCmd} -m venv .venv`, pdir);
        } catch (err) {
          console.warn(`Creating venv with '${pyCmd} -m venv .venv' failed. Ensure Python 3 is installed and on PATH.`);
          continue;
        }
        const pipPath = isWin
          ? path.join(pdir, '.venv', 'Scripts', 'pip.exe')
          : path.join(pdir, '.venv', 'bin', 'pip');
        if (!fs.existsSync(pipPath)) {
          console.warn(`pip not found in venv at ${pipPath}. Activate venv manually and run 'pip install -r requirements.txt'`);
          continue;
        }
        run(`${pipPath} install --upgrade pip`, pdir);
        run(`${pipPath} install -r requirements.txt`, pdir);
        continue;
      }

      console.log(`\nNo package.json or requirements.txt in ${p}, skipping`);
    }

    console.log('\nAll installs finished.');
  } catch (err) {
    console.error('\nInstall failed:', err);
    process.exit(1);
  }
})();