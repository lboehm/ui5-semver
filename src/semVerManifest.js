const chalk = require('chalk');
const constants = require('./constants');
const {
  readManifest, readVersion, incrementVersion, updateManifest, writeManifest, validateVersion
} = require('./helper');

function increment(versionCategory, verbose) {
  const profile = constants.parameters.profile.ui5;
  const path = profile.manifestPath;

  if (verbose) console.log(chalk.cyan(`Reading manifest '${path}'`));
  let manifest = readManifest(path);


  if (verbose) console.log(chalk.cyan(`Incrementing ${versionCategory} version info:`));

  const version = readVersion(manifest, profile.versionPropertyPath);
  if (verbose) console.log(chalk.cyan(`  -> Current version is '${version}'`));

  const newVersionString = incrementVersion(version, versionCategory);
  if (verbose) console.log(chalk.cyan(`  -> New version is '${newVersionString}'`));

  manifest = updateManifest(manifest, profile.versionPropertyPath, newVersionString);

  writeManifest(manifest, path);
}

function setVersion(version, verbose) {
  const profile = constants.parameters.profile.ui5;
  const path = profile.manifestPath;

  if (verbose) console.log(chalk.cyan('Validating version'));
  const validVersion = validateVersion(version);
  if (!validVersion) throw new Error('Invalid version parameter value. Proper format is X.Y.Z');

  if (verbose) console.log(chalk.cyan(`Reading manifest '${path}'`));
  let manifest = readManifest(path);


  if (verbose) console.log(chalk.cyan('Updating version info:'));

  const currentVersion = readVersion(manifest, profile.versionPropertyPath);
  if (verbose) console.log(chalk.cyan(`  -> Current version is '${currentVersion}'`));

  if (verbose) console.log(chalk.cyan(`  -> New version is '${version}'`));

  manifest = updateManifest(manifest, profile.versionPropertyPath, version);

  writeManifest(manifest, path);
}

module.exports = { increment, setVersion };
