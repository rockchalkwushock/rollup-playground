import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import cleanup from 'rollup-plugin-cleanup';
import commonjs from 'rollup-plugin-commonjs';
import conditional from 'rollup-plugin-conditional';
import eslint from 'rollup-plugin-eslint';
import filesize from 'rollup-plugin-filesize';
import flow from 'rollup-plugin-flow';
import gzip from 'rollup-plugin-gzip';
import multidest from 'rollup-plugin-multidest';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

// Environment Check.
const isProd = process.env.NODE_ENV === 'production';
// Plugin options objects.
const opts = {
  flow: { pretty: true },
  replace: { 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) },
  uglify: {
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
  },
};

export default {
  entry: 'src/index.js',
  moduleName: 'rollup-playground',
  format: 'cjs',
  dest: 'lib/index.js',
  plugins: [
    eslint(),
    flow(opts.flow),
    babel(babelrc()),
    commonjs(),
    replace(opts.replace),
    multidest([
      {
        format: 'umd',
        dest: 'dist/rollup-playground.js',
      },
      {
        format: 'umd',
        dest: 'dist/rollup-playground.min.js',
        plugins: [uglify(opts.uglify)],
      },
    ]),
    gzip({ minSize: 1000 }),
    conditional(!isProd, [filesize()]),
    cleanup(),
  ],
};
