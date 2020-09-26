import { assert } from 'chai';
import {
  readVersion, incrementVersion, updateManifest, validateVersion
} from '../src/helper';

describe('Test helper', () => {
  it('should read version from manifest', () => {
    const manifest = {
      'sap.app': {
        applicationVersion: {
          version: '0.13.18'
        }
      }
    };

    const expectedVal = '0.13.18';
    assert(readVersion(manifest, 'sap.app/applicationVersion') === expectedVal, 'Reading version failed.');
  });

  it('should throw error on wrong path', () => {
    const manifest = {
      'sap.app': {
        applicationVersion: {
          version: '0.13.18'
        }
      }
    };

    assert.throws(() => { readVersion(manifest, 'sap.app/fooBaz'); }, Error, 'Invalid manifest structure.');
  });

  it('should increment version', () => {
    const expectedMajor = '1.0.0';
    assert(incrementVersion('0.0.0', 'major') === expectedMajor, 'Incrementing major version failed');

    const expectedMinor = '0.1.0';
    assert(incrementVersion('0.0.0', 'minor') === expectedMinor, 'Incrementing major version failed');

    const expectedPatch = '0.0.1';
    assert(incrementVersion('0.0.0', 'patch') === expectedPatch, 'Incrementing patch version failed');
  });


  it('should update manifest', () => {
    const manifest = {
      'sap.app': {
        applicationVersion: {
          version: '0.13.18'
        }
      }
    };
    const expectedVersion = '0.13.19';
    updateManifest(manifest, 'sap.app/applicationVersion', expectedVersion);
    assert(manifest['sap.app'].applicationVersion.version === expectedVersion, 'Updating manifest failed');
  });

  it('should validate version', () => {
    const validVersion = '0.0.0';
    assert(validateVersion(validVersion), 'Validating version failed');

    const invalidVersion = '0.0.0f';
    assert(!validateVersion(invalidVersion), 'Validating version failed');
  });
});
