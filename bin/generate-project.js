#! /usr/bin/env node

'use strict';

const path = require('path');
const util = require('util');
const packageJson = require('../package.json');
const chalkAnimation = require('chalk-animation');
const fs = require('fs');
var figlet = require('figlet');
const exec = util.promisify(require('child_process').exec);
let newPackage = {};

async function runCmd(command) {
  try {
    const { stdout, stderr } = await exec(command);
    console.log(stdout);
    console.log(stderr);
  } catch {
    (error) => {
      console.log('\x1b[31m', error, '\x1b[0m');
    };
  }
}

if (process.argv.length < 3) {
  console.log('\x1b[31m', 'You have to provide name to your app.');
  console.log('For example:');
  console.log('    npx let-me-react my-app', '\x1b[0m');
  process.exit(1);
}

const ownPath = process.cwd();
const folderName = process.argv[2];
const appPath = path.join(ownPath, folderName);
const repo = 'https://github.com/Suvink/let-me-react.git';

try {
  fs.mkdirSync(appPath);
} catch (err) {
  if (err.code === 'EEXIST') {
    console.log(
      '\x1b[31m',
      `The file ${appName} already exist in the current directory, please give it another name.`,
      '\x1b[0m'
    );
  } else {
    console.log(err);
  }
  process.exit(1);
}

async function setup() {
  try {
    const rainbow = chalkAnimation.karaoke('⬇️  Downloading the project structure... So පොඩ්ඩක් ඉඳපන්! ');
    rainbow.start();
    await runCmd(`git clone --depth 1 ${repo} ${folderName}`);
    rainbow.stop();
    process.chdir(appPath);

    fs.unlinkSync(path.join(appPath, 'LICENSE'));
    fs.unlinkSync(path.join(appPath, 'README.md'));
    fs.rmdirSync(path.join(appPath, 'bin'), { recursive: true });
    fs.unlinkSync(path.join(appPath, 'package.json'));
    fs.unlinkSync(path.join(appPath, 'package-lock.json'));

    console.log('\x1b[36m', '⌛  Creating a new package...', '\x1b[0m');
    await buildPackageJson(packageJson, folderName);

    const karoke = chalkAnimation.karaoke('⌛  Installing dependencies...');
    karoke.start();
    await runCmd('yarn install');
    karoke.stop();
    console.log();

    await runCmd('npx rimraf ./.git');

    figlet('READY!', function (err, data) {
      if (err) {
        return;
      }
      console.log(data)
    });
    console.log(
      '\x1b[32m',
      '✅  The installation is done, You may React Now! That means ගිහින් වැඩ කරපන්!',
      '\x1b[0m'
    );
    console.log();

    console.log('\x1b[33m', 'You can start by typing:');
    console.log(`    cd ${folderName}`);
    console.log('    npm start', '\x1b[33m');
    console.log();
    console.log('Check README.md for more information');
    console.log();
  } catch (error) {
    console.log(error);
  }
}

setup();

async function buildPackageJson(packageJson, folderName) {
  newPackage = {
    name: folderName,
    version: '1.0.0',
    description: 'A sample ReactJS App Created with Let-Me-React',
    author: '',
    license: "ISC",
    scripts: {
      start: "react-scripts start",
      build: "react-scripts build",
      test: "react-scripts test",
      eject: "react-scripts eject"
    },
    dependencies: {
      "@testing-library/jest-dom": "^5.11.4",
      "@testing-library/react": "^11.1.0",
      "@testing-library/user-event": "^12.1.10",
      "bulma": "^0.9.2",
      "notistack": "^1.0.9",
      "react": "^17.0.2",
      "react-dom": "^17.0.2",
      "react-router-dom": "^5.2.0",
      "react-scripts": "4.0.3",
      "sweetalert2": "^11.0.18",
      "web-vitals": "^1.0.1"
    },
    "browserslist": {
      "production": [
        ">0.2%",
        "not dead",
        "not op_mini all"
      ],
      "development": [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
      ]
    }
  };

  fs.writeFileSync(
    `${process.cwd()}/package.json`,
    JSON.stringify(newPackage, null, 2),
    'utf8'
  );
}