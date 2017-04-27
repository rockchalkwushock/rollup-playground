const npsUtils = require('nps-utils');

const series = npsUtils.series;
const concurrent = npsUtils.concurrent;
const crossEnv = npsUtils.crossEnv;
const rimraf = npsUtils.rimraf;

module.exports = {
  scripts: {
    test: 'echo "This runs on `nps`"',
    build: {
      description: 'Clean project & build in production',
      default: series.nps('clean', 'build.prod'),
      dev: {
        // No need to set environment here as 'development'
        // is the default environment; however using cross-env
        // so this works across all platforms.
        description: 'Building in development environment.',
        script: `${crossEnv('NODE_ENV=development')} rollup -c`,
      },
      prod: {
        description: 'Building in production environment.',
        script: `${crossEnv('NODE_ENV=production')} rollup -c`,
      },
    },
    clean: {
      // Want to find a more compact way to handle this.
      // If I pass rimraf('dist', 'another string') it will
      // only remove 'dist' so it only accepts one string which sucks!
      description: 'Clean project of extraneous directories & files.',
      default: concurrent.nps(
        'clean.dist',
        'clean.es',
        'clean.lib',
        'clean.package',
        'clean.tarball'
      ),
      dist: {
        description: 'Remove dist/',
        script: rimraf('dist'),
      },
      es: {
        description: 'Remove es/',
        script: rimraf('es'),
      },
      lib: {
        description: 'Remove lib/',
        script: rimraf('lib'),
      },
      package: {
        description: 'Remove package/',
        script: rimraf('package'),
      },
      tarball: {
        description: 'Remove tarball file',
        script: rimraf('*.tgz'),
      },
    },
    flow: {
      description: 'Type check selected code.',
      script: 'flow check',
    },
    format: {
      // this would be a great place for prettier!
    },
    library: {
      description: 'Generate tarball file & open',
      default: series.nps('library.pack', 'library.open'),
      open: {
        description: 'Open the tarball file',
        script: 'open rollup-playground-0.1.0.tgz',
      },
      pack: {
        description: 'Package the build for local use',
        script: 'npm pack',
      },
    },
    lint: {
      default: {
        description: 'Perform lint check on selected code.',
        script: 'eslint src',
      },
      fix: {
        description: 'Perform lint check on selected code & fix all errors.',
        script: 'eslint src --fix',
      },
    },
    sandbox: {
      // Test out build by running the code.
      description: 'Run all sandbox scripts.',
      default: series.nps('sandbox.cjs', 'sandbox.es'),
      cjs: {
        description: 'Run commonjs code.',
        script: 'babel-node sandbox-cjs.js',
      },
      es: {
        description: 'Run all sandbox scripts.',
        script: `${crossEnv('BABEL_ENV=sandbox')} babel-node sandbox-es.js`,
      },
    },
    validate: {
      // Any linting, testing, type-checking, etc can be ran here.
      // This would be used before the build script is executed by CI.
      description: 'Validate code with linting & type-checking.',
      script: concurrent.nps('lint.fix', 'flow'),
    },
  },
};
