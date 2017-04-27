import babel from 'rollup-plugin-babel';
import cleanup from 'rollup-plugin-cleanup';
import commonjs from 'rollup-plugin-commonjs';
import eslint from 'rollup-plugin-eslint';
import filesize from 'rollup-plugin-filesize';
import flow from 'rollup-plugin-flow';
import gzip from 'rollup-plugin-gzip';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import visualizer from 'rollup-plugin-visualizer';

const config = {
  // Where should rollup start?
  entry: 'src/index.js',
  // What should rollup call the bundle?
  moduleName: 'rollup-playground',
  // What plugins should rollup use at build time?
  plugins: [
    // This should run first if using external packages
    // to be included in bundle (i.e. react, redux)
    // https://github.com/rollup/rollup-plugin-node-resolve
    resolve({ jsnext: true, main: true }),
    // Must perform linting prior to babel!!!
    // https://github.com/TrySound/rollup-plugin-eslint
    eslint(),
    // Remove flow-type annotations during build process.
    // https://github.com/leebyron/rollup-plugin-flow
    flow({ pretty: true }),
    // Transpile code based off of the .babelrc.
    // https://github.com/rollup/rollup-plugin-babel
    babel(),
    // Customize the build based on environments using this.
    // Will not build code that does not pertain to current
    // environment.
    // https://github.com/rollup/rollup-plugin-replace
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    // Compress bundle(s) if size > 1KB
    // https://github.com/kryops/rollup-plugin-gzip
    gzip({ minSize: 1000 }),
    // Output filesize of generated bundle(s).
    // https://github.com/ritz078/rollup-plugin-filesize
    filesize(),
    // Just like webpack-visualizer
    // Generates a stats.html at root level.
    // https://github.com/btd/rollup-plugin-visualizer
    visualizer(),
    // MUST BE LAST PLUGIN!!!
    // https://github.com/aMarCruz/rollup-plugin-cleanup
    cleanup(),
  ],
};

// When wanting to build es modules I don't want babel to transpile the code.
// However for cjs & umd I will want to transpile the code to ES5(cjs).
if (process.env.BABEL_ENV === 'cjs') {
  // https://github.com/rollup/rollup-plugin-commonjs
  config.plugins.push(commonjs());
}

// Minify code in production environment only.
if (process.env.NODE_ENV === 'production') {
  // https://github.com/TrySound/rollup-plugin-uglify
  config.plugins.push(uglify({
    compress: {
      pure_getters: true,
      unsafe: true,
      warnings: false,
      screw_ie8: false,
    },
    mangle: {
      screw_ie8: false,
    },
    output: {
      screw_ie8: false,
    },
  })
  );
}

export default config;
