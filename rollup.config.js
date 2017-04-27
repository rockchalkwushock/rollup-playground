import babel from 'rollup-plugin-babel';
import cleanup from 'rollup-plugin-cleanup';
import commonjs from 'rollup-plugin-commonjs';
import conditional from 'rollup-plugin-conditional';
import filesize from 'rollup-plugin-filesize';
import flow from 'rollup-plugin-flow';
import gzip from 'rollup-plugin-gzip';
import multidest from 'rollup-plugin-multidest';
import uglify from 'rollup-plugin-uglify';

// Environment Check.
const isProd = process.env.NODE_ENV === 'production';
// Plugin options objects.
const opts = {
  babel: { exclude: 'node_modules/**' },
  flow: { pretty: true },
  gzip: { minSize: 1000 },
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
  format: 'es',
  dest: 'es/index.js',
  plugins: [
    flow(opts.flow),
    multidest([
      {
        format: 'cjs',
        dest: 'lib/index.js',
        plugins: [
          commonjs(),
          babel(opts.babel),
        ],
      },
      {
        format: 'umd',
        dest: 'dist/rollup-playground.js',
        plugins: [commonjs(), babel(opts.babel)],
      },
      {
        format: 'umd',
        dest: 'dist/rollup-playground.min.js',
        plugins: [
          commonjs(),
          babel(opts.babel),
          uglify(opts.uglify),
        ],
      },
    ]),
    gzip(opts.gzip),
    conditional(!isProd, [filesize()]),
    cleanup(),
  ],
};
