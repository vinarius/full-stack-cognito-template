/* eslint-disable @typescript-eslint/no-explicit-any */
import * as originalPackage from '../package.json';
import {resolve, sep} from 'path';
import {promisify} from 'util';
import {exists as EXISTS} from 'fs';
import {promises} from 'fs';
import {exec, fromRoot} from '../lib/utils';

const {writeFile, mkdir} = promises;
const exists = promisify(EXISTS);

const outDirName: string = 'dist'; 
const OUTPUT_DIR: string = fromRoot(outDirName);
const layerDirName: string = 'lambdaLayer'; 
const LAYER_DIR: string = resolve(OUTPUT_DIR, layerDirName);
const nodeDirName: string = 'nodejs'; 
const NODE_FOLDER: string = resolve(LAYER_DIR, nodeDirName);
const PACKAGE_JSON: string = resolve(NODE_FOLDER, 'package.json');

// Creates folder structure how AWS expects for nodejs.
export async function buildFileStructure(): Promise<void> {
  for (const folder of [OUTPUT_DIR, LAYER_DIR, NODE_FOLDER]) {
    if (!(await exists(folder))) {
      await mkdir(folder);
    }
  }
}

// Creates new package.json, gives it a name, description and includes dependencies for fresh install with npm.
export async function buildPackageJson(): Promise<void> {
  const newPkg = {...originalPackage};
  delete (newPkg as any).scripts;
  delete (newPkg as any).devDependencies;
  newPkg.name = `${originalPackage.name}-lambda-layer`;
  newPkg.description = `Lambda layer for ${originalPackage.name}`;
  await writeFile(PACKAGE_JSON, JSON.stringify(newPkg, undefined, 2));
}

export async function syncDependencies(): Promise<void> {
  await buildFileStructure();
  await buildPackageJson();
  await exec(`cd ${[outDirName, layerDirName, nodeDirName].join(sep)} && npm i --only=prod --no-package-lock`);
}

syncDependencies();