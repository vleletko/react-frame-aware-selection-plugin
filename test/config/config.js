import path from 'path'

const manifest = require('../../package.json');



const config = manifest.babelBoilerplateOptions;
const mainFile = manifest.main;
const mainVarName = config.mainVarName;
const destinationFolder = path.dirname(mainFile);
const exportFileName = path.basename(mainFile, path.extname(mainFile));

const testDir = path.join(__dirname,'..');
const sourceDir = path.join(testDir,'..','src');

export default {
  exportFileName,
  destinationFolder,
  mainVarName,
  testDir,
  sourceDir
}
