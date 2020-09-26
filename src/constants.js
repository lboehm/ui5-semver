module.exports = {
  parameters: {
    version: ['major', 'minor', 'patch'],
    profile: {
      ui5: {
        manifestPath: 'webapp/manifest.json',
        versionPropertyPath: '/sap.app/applicationVersion'
      }
    }
  }
};
