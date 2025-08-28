import { execSync } from 'child_process';
import fs, { cpSync } from 'fs';
import os from 'os';
import path from 'path';

/**
 * @typedef {{
 *   version: string,
 *   private?: string | boolean,
 *   main: string,
 *   type: 'module' | 'commonjs'
 *   types: string,
 *   scripts?: Record<string, string>,
 *   publishConfig: {
 *     access: string
 *   },
 *   devDependencies?: Record<string, string>,
 * }} PackageJson
 */

const ROOT_PROJECT = process.cwd();
const outDirName = 'dist';
const COLORS = {
  green: '[32m',
  blue: '[34m',
  stop: '[39m',
};

buildPackageConfig();

async function buildPackageConfig() {
  cleanDistDirectory();

  build();

  copyStaticFiles();

  manipulatePackageJsonFile(); // <--- must come AFTER copy of static files

  console.log(`${os.EOL}${COLORS.blue}DONE !!!${COLORS.stop}${os.EOL}`);
}

function cleanDistDirectory() {
  console.log(`${COLORS.green}- Step 1:${COLORS.stop} clear the ${outDirName} directory`);
  if (os.platform() === 'win32') {
    execSync(`rd /s /q ${outDirName}`);
  } else {
    execSync(`rm -rf ${outDirName}`);
  }
}

function build() {
  console.log(`${COLORS.green}- Step 2:${COLORS.stop} build`);
  execSync('rollup --config'); // or the full command: rollup --config rollup.config.mjs
}

function copyStaticFiles() {
  console.log(`${COLORS.green}- Step 3:${COLORS.stop} copy static files`);

  const filesToCopyArr = [
    { filename: 'package.json', sourceDirPath: [], destinationDirPath: [] },
    { filename: '.npmignore', sourceDirPath: [], destinationDirPath: [], isAllowedToFail: true },
    { filename: '.npmrc', sourceDirPath: [], destinationDirPath: [], isAllowedToFail: true },
    { filename: 'README.md', sourceDirPath: [], destinationDirPath: [] },
  ];

  filesToCopyArr.forEach(({ filename, sourceDirPath, destinationDirPath, isAllowedToFail }) => {
    try {
      const sourceFileFullPath = path.resolve(ROOT_PROJECT, ...sourceDirPath, filename);
      const destinationFileFullPath = path.resolve(ROOT_PROJECT, outDirName, ...destinationDirPath, filename);

      cpSync(sourceFileFullPath, destinationFileFullPath);
      console.log(`    • ${filename}`);
    } catch (error) {
      if (isAllowedToFail) return;

      console.error(error);

      throw new Error('File MUST exists in order to PASS build process! cp operation failed...');
    }
  });
}

function manipulatePackageJsonFile() {
  console.log(`${COLORS.green}- Step 4:${COLORS.stop} copy & manipulate the package.json file`);

  const packageJsonPath = path.resolve(ROOT_PROJECT, outDirName, 'package.json');

  // Step: get the original package.json file
  /** @type {PackageJson} */
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString());

  delete packageJson.private;
  delete packageJson.scripts;
  delete packageJson.devDependencies;
  packageJson.publishConfig.access = 'public';
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson));

  console.log(`  • ${COLORS.blue}changed${COLORS.stop} from private to public`);
  console.log(`  • ${COLORS.blue}deleted${COLORS.stop} "scripts" key`);
  console.log(`  • ${COLORS.blue}deleted${COLORS.stop} "devDependencies" key`);
  console.log(`  • ${COLORS.blue}changed${COLORS.stop} publishConfig access to public`);
  console.log(`  • ${COLORS.blue}package.json${COLORS.stop} file written successfully!`);
}
