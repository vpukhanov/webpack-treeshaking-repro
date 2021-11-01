const path = require('path')

module.exports = () => {
  return {
    mode: 'production',
    target: 'node',
    entry: path.resolve(__dirname, 'src/index.ts'),
    output: {
      path: path.resolve(__dirname, 'lib/'),
      filename: 'index.js',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      mainFields: ['main'],
    },
    optimization: {
      // turning off minimize to see the problem better
      // in the final bundle
      minimize: false,
    },
    module: {
      rules: [
        {
          test: /\.[tj]sx?$/,
          use: {
            loader: require.resolve('babel-loader'),
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    loose: true,
                    // workaround: if we ask babel to provide commonjs modules,
                    // webpack can't tree shake them afterwards, and the bundle
                    // works correctly
                    // modules: 'cjs',
                  },
                ],
                '@babel/preset-typescript',
              ],
              plugins: [['@babel/plugin-transform-runtime']],
            },
          },
        },
      ],
    },
  }
}
