import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import cleanup from 'rollup-plugin-cleanup';
import conditional from 'rollup-plugin-conditional';
import eslint from 'rollup-plugin-eslint';
import filesize from 'rollup-plugin-filesize';
import flow from 'rollup-plugin-flow';
import gzip from 'rollup-plugin-gzip';
import replace from 'rollup-plugin-replace';

// Environment Check.
const isProd = process.env.NODE_ENV === 'production';
// Plugin options objects.
const opts = {
  flow: { pretty: true },
  replace: { 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) },
};

export default {
  entry: 'src/index.js',
  format: 'es',
  moduleName: 'rollup-playground',
  dest: 'es/index.js',
  plugins: [
    eslint(),
    flow(opts.flow),
    babel(babelrc()),
    replace(opts.replace),
    gzip({ minSize: 1000 }),
    conditional(!isProd, [filesize()]),
    cleanup(),
  ],
};
