const fs = require('fs');

function readManifest(path) {
  const content = fs.readFileSync(path);

  const manifest = JSON.parse(content);
  return manifest;
}

function readVersion(manifest, versionPropertyPath) {
  let obj = JSON.parse(JSON.stringify(manifest));

  versionPropertyPath.split('/').forEach((e) => {
    if (!e) return;

    if (!Object.prototype.hasOwnProperty.call(obj, e)) {
      throw new Error('Invalid manifest structure.');
    }

    obj = obj[e];
  });

  const { version } = obj;
  return version;
}

function incrementVersion(version, versionStep) {
  const versionArray = version.split('.');

  let major = versionArray[0];
  let minor = versionArray[1];
  let patch = versionArray[2];

  if (versionStep === 'major') {
    major = parseInt(major, 10) + 1;
  } else if (versionStep === 'minor') {
    minor = parseInt(minor, 10) + 1;
  } else if (versionStep === 'patch') {
    patch = parseInt(patch, 10) + 1;
  }

  const newVersionString = `${major}.${minor}.${patch}`;
  return newVersionString;
}

function updateManifest(manifest, versionPropertyPath, newVersion) {
  let obj = manifest;

  versionPropertyPath.split('/').forEach((e) => {
    if (!e) return;

    obj = obj[e];
  });

  obj.version = newVersion;
  return manifest;
}

function writeManifest(manifest, path) {
  const fileContent = JSON.stringify(manifest, null, 4);

  fs.writeFileSync(path, fileContent);
}

function validateVersion(version) {
  return /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/.test(version);
}

module.exports = {
  readManifest,
  readVersion,
  incrementVersion,
  updateManifest,
  writeManifest,
  validateVersion
};
